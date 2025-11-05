import React, { useEffect, useState } from "react";
import api from "../services/api";

function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const doctorId = localStorage.getItem("doctorId");

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await api.get(`/appointments/doctor/${doctorId}`);
      setAppointments(response.data);
    };
    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ваши приёмы</h2>
      <ul>
        {appointments.map((app) => (
          <li key={app.id}>
            Пациент: {app.patient.fullName} — Дата: {app.appointmentDate.replace("T", " ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorAppointmentsPage;
