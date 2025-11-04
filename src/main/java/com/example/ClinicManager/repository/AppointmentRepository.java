package com.example.ClinicManager.repository;

import com.example.ClinicManager.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Получить все приёмы конкретного врача
    List<Appointment> findByDoctorId(Long doctorId);

    // Получить все приёмы на конкретную дату
    List<Appointment> findByAppointmentDate(LocalDate date);
}
