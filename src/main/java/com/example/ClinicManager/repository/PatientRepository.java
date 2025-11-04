package com.example.ClinicManager.repository;

import com.example.ClinicManager.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Метод должен соответствовать имени поля 'phone' в классе Patient
    Patient findByPhone(String phone);
}
