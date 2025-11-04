package com.example.ClinicManager.repository;

import com.example.ClinicManager.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // пример запроса по специализации врача
    Doctor findBySpecialization(String specialization);
}

