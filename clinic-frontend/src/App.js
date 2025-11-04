import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";
import Login from "./Login";
import Register from "./Register"; // 👈 добавляем импорт

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <nav style={{ padding: "10px", background: "#eee" }}>
            <Link to="/patients" style={{ marginRight: "10px" }}>
              Добавить пациента
            </Link>
            <Link to="/doctors" style={{ marginRight: "10px" }}>
              Записаться к доктору
            </Link>
            <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
              Выйти
            </button>
          </nav>

          <Routes>
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="*" element={<Navigate to="/patients" />} />
          </Routes>
        </>
      ) : (
        <>
          <nav style={{ padding: "10px", background: "#eee" }}>
            <Link to="/">Войти</Link>
            <Link to="/register" style={{ marginLeft: "10px" }}>
              Регистрация
            </Link>
          </nav>

          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
