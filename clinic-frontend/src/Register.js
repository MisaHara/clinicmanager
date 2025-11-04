import React, { useState } from "react";
import axios from "axios";

function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", {
        username,
        password,
        role,
      });
      setMessage("Регистрация прошла успешно! Теперь войдите.");
      if (onRegister) onRegister();
    } catch (error) {
      setMessage("Ошибка при регистрации. Возможно, пользователь уже существует.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <div>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ margin: "5px", padding: "8px" }}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ margin: "5px", padding: "8px" }}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            <input
              type="radio"
              value="PATIENT"
              checked={role === "PATIENT"}
              onChange={(e) => setRole(e.target.value)}
            />
            Пациент
          </label>
          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              value="DOCTOR"
              checked={role === "DOCTOR"}
              onChange={(e) => setRole(e.target.value)}
            />
            Доктор
          </label>
        </div>

        <button type="submit" style={{ padding: "8px 16px", marginTop: "15px" }}>
          Зарегистрироваться
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
