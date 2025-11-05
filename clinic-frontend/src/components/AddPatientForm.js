import React, { useState } from "react";
import api from "../services/api";

function AddPatientForm({ onAdd }) {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Поля должны совпадать с колонками в БД
      const newPatient = {
        full_name: fullName,
        date_of_birth: dateOfBirth,
        phone_number: phoneNumber,
        address,
      };

      const response = await api.post("/patients", newPatient);
      onAdd(response.data);

      // Очистка формы
      setFullName("");
      setDateOfBirth("");
      setPhoneNumber("");
      setAddress("");
    } catch (err) {
      console.error("Ошибка при добавлении пациента:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="ФИО"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Телефон"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Адрес"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Добавить пациента</button>
    </form>
  );
}

export default AddPatientForm;
