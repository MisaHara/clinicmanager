package com.example.ClinicManager.service;

import com.example.ClinicManager.model.Appointment;
import com.example.ClinicManager.model.Doctor;
import com.example.ClinicManager.repository.AppointmentRepository;
import com.example.ClinicManager.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Доктор не найден"));
        return appointmentRepository.findByDoctor(doctor);
    }

    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();
        return appointmentRepository.findByAppointmentDateBetween(start, end);
    }


    public Appointment updateAppointment(Long id, Appointment updated) {
        Appointment existing = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Запись не найдена"));
        existing.setAppointmentDate(updated.getAppointmentDate());
        existing.setConfirmed(updated.isConfirmed());
        return appointmentRepository.save(existing);
    }
}
