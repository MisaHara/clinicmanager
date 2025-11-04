import React, { useEffect, useState } from "react";
import api from "../services/api";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    specialization: "",
    phone: ""
  });

  const loadDoctors = async () => {
    try {
      const response = await api.get("/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке докторов:", error);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/doctors", form);
      setForm({ fullName: "", specialization: "", phone: "" });
      loadDoctors();
    } catch (error) {
      console.error("Ошибка при добавлении доктора:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Список докторов</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="fullName"
          placeholder="ФИО"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Специализация"
          value={form.specialization}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Телефон"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">Добавить</button>
      </form>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Специализация</th>
            <th>Телефон</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.fullName}</td>
              <td>{d.specialization}</td>
              <td>{d.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorsPage;
