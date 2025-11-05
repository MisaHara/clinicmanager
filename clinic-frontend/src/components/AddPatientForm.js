import React, { useState } from "react";
import api from "../services/api";

function AddPatientForm({ onAdd }) {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPatient = {
        fullName,
        birthDate,
        phone,
        address,
      };

      const response = await api.post("/patients", newPatient);
      onAdd(response.data);

      // Очистка формы
      setFullName("");
      setBirthDate("");
      setPhone("");
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
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
