package com.example.ClinicManager.controller;

import com.example.ClinicManager.dto.AuthenticationRequest;
import com.example.ClinicManager.dto.AuthenticationResponse;
import com.example.ClinicManager.dto.RegisterRequest;
import com.example.ClinicManager.model.Doctor;
import com.example.ClinicManager.model.Patient;
import com.example.ClinicManager.model.User;
import com.example.ClinicManager.repository.DoctorRepository;
import com.example.ClinicManager.repository.PatientRepository;
import com.example.ClinicManager.repository.UserRepository;
import com.example.ClinicManager.security.JwtService;
import com.example.ClinicManager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public AuthenticationResponse register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Такой пользователь уже существует");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .role(request.getRole().toUpperCase())
                .build();

        User savedUser = userService.saveUser(user);

        if ("DOCTOR".equalsIgnoreCase(request.getRole())) {
            Doctor doctor = new Doctor();
            doctor.setFullName(request.getUsername());
            doctor.setSpecialization(request.getSpecialization());
            doctor.setPhone(request.getPhone());
            doctor.setUser(savedUser);
            doctorRepository.save(doctor);
        } else if ("PATIENT".equalsIgnoreCase(request.getRole())) {
            Patient patient = new Patient();
            patient.setFullName(request.getUsername());
            patient.setBirthDate(LocalDate.now());
            patient.setPhone(request.getPhone());
            patient.setAddress("Не указан");
            patient.setUser(savedUser);
            patientRepository.save(patient);
        }

        String jwtToken = jwtService.generateToken(savedUser);
        // добавляем user, потому что конструктор требует два аргумента
        return new AuthenticationResponse(jwtToken, savedUser);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new RuntimeException("Неверный логин или пароль");
        }

        User user = userService.findByUsername(request.getUsername());
        System.out.println("LOGIN SUCCESS: " + user.getUsername());
        String jwtToken = jwtService.generateToken(user);

        // Теперь возвращаем и токен, и пользователя
        return new AuthenticationResponse(jwtToken, user);
    }
}
