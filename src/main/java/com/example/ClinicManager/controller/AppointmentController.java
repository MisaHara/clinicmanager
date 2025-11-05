package com.example.ClinicManager.controller;

import com.example.ClinicManager.model.Appointment;
import com.example.ClinicManager.model.Doctor;
import com.example.ClinicManager.model.Patient;
import com.example.ClinicManager.model.User;
import com.example.ClinicManager.repository.AppointmentRepository;
import com.example.ClinicManager.repository.DoctorRepository;
import com.example.ClinicManager.repository.PatientRepository;
import com.example.ClinicManager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final UserService userService;

    // DTO для записи
    public static class BookRequest {
        public Long doctorId;
        public String dateTime; // ISO string expected
    }

    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Записаться к доктору — patient берём из текущего пользователя
    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody BookRequest req) {
        // 1) парсим дату
        LocalDateTime appointmentDate;
        try {
            appointmentDate = LocalDateTime.parse(req.dateTime);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Неверный формат dateTime. Ожидается ISO: yyyy-MM-ddTHH:mm[:ss]");
        }

        // 2) найдём доктора
        Doctor doctor = doctorRepository.findById(req.doctorId)
                .orElseThrow(() -> new RuntimeException("Доктор не найден"));

        // 3) найдём текущего пользователя из контекста (JWT)
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof User)) {
            return ResponseEntity.status(401).body("Не авторизован");
        }
        User currentUser = (User) principal;

        // 4) найдём пациента, соответствующий текущему юзеру
        // (предполагаем, что Patient.user ссылается на User)
        Patient patient = patientRepository.findByUserId(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("Профиль пациента не найден для текущего пользователя"));

        // 5) проверка занятости — точная (и защита на уровне БД)
        if (appointmentRepository.findByDoctorIdAndAppointmentDate(doctor.getId(), appointmentDate).isPresent()) {
            return ResponseEntity.badRequest().body("Эта дата уже занята");
        }

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentDate(appointmentDate);
        appointment.setConfirmed(false);

        try {
            appointmentRepository.save(appointment);
        } catch (DataIntegrityViolationException e) {
            // гонка — другой запрос успел записаться -> сообщаем занято
            return ResponseEntity.badRequest().body("Эта дата уже занята (конфликт сохранения).");
        }

        return ResponseEntity.ok("Запись успешно создана");
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsForDoctor(@PathVariable Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsForPatient(@PathVariable Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }
}
