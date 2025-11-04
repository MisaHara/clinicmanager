import React, { useState, useEffect } from "react";
import api from "../services/api";
import AddPatientForm from "../components/AddPatientForm";


function PatientsPage() {
  const [patients, setPatients] = useState([]);

  // Загружаем список пациентов при монтировании компонента
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/patients");
        setPatients(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке пациентов:", err);
      }
    };

    fetchPatients();
  }, []);

  // Добавление нового пациента в список
  const handleAddPatient = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
  };

  // Удаление пациента
  const handleDeletePatient = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении пациента:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Список пациентов</h1>

      {/* Форма добавления */}
      <AddPatientForm onAdd={handleAddPatient} />

      {/* Список пациентов */}
      <ul>
        {patients.map((patient) => (
          <li key={patient.id} style={{ marginBottom: "10px" }}>
            <strong>{patient.fullName}</strong> — {patient.phone} — {patient.birthDate} — {patient.address}
            <button
              onClick={() => handleDeletePatient(patient.id)}
              style={{ marginLeft: "10px" }}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientsPage;
