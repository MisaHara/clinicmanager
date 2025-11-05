package com.example.ClinicManager.repository;

import com.example.ClinicManager.model.Appointment;
import com.example.ClinicManager.model.Doctor;
import com.example.ClinicManager.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByPatient(Patient patient);

    // удобные методы по id (не нужно загружать Doctor/Patient заранее)
    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByPatientId(Long patientId);

    // существование записи для конкретного доктора на конкретную точную дату/время
    Optional<Appointment> findByDoctorIdAndAppointmentDate(Long doctorId, LocalDateTime appointmentDate);

    // записи доктора в диапазоне дат (удобно для поиска по дате)
    List<Appointment> findByDoctorIdAndAppointmentDateBetween(Long doctorId, LocalDateTime start, LocalDateTime end);

    // все записи на конкретную дату (внутри дня)
    List<Appointment> findByAppointmentDateBetween(LocalDateTime start, LocalDateTime end);
}
