import React, { useEffect, useState } from "react";
import api from "../services/api";

function BookAppointmentPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/appointments/doctors");
        setDoctors(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке докторов:", err);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientId = localStorage.getItem("patientId") || 1; // Временно

    try {
      const response = await api.post(
        `/appointments/book?doctorId=${selectedDoctor}&patientId=${patientId}&dateTime=${dateTime}`
      );
      setMessage(response.data);
    } catch (err) {
      console.error("Ошибка при записи:", err);
      setMessage("Ошибка при записи!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Записаться к доктору</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <label>Выберите доктора:</label>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          required
        >
          <option value="">-- Выберите врача --</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.fullName} ({doc.specialization})
            </option>
          ))}
        </select>

        <label>Дата и время записи:</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          Записаться
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "20px",
            fontWeight: "bold",
            color: message.includes("успешно") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default BookAppointmentPage;
