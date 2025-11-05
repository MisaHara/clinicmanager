import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import DoctorAppointmentsPage from "./pages/DoctorAppointmentsPage";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);

  // При старте читаем данные пользователя из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <nav style={{ padding: "10px", background: "#eee" }}>
            {/* Пациенты — только не для пациента */}
            {user?.role !== "PATIENT" && (
              <Link to="/patients" style={{ marginRight: "10px" }}>
                Пациенты
              </Link>
            )}

            {/* Доктора — только не для доктора */}
            {user?.role !== "DOCTOR" && (
              <Link to="/doctors" style={{ marginRight: "10px" }}>
                Доктора
              </Link>
            )}

            {/* Записаться — только не для доктора */}
            {user?.role !== "DOCTOR" && (
              <Link to="/book" style={{ marginRight: "10px" }}>
                Записаться
              </Link>
            )}

            {/* Приёмы доктора — только не для доктора */}
            {user?.role !== "DOCTOR" && (
              <Link to="/appointments" style={{ marginRight: "10px" }}>
                Приёмы доктора
              </Link>
            )}

            <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
              Выйти
            </button>
          </nav>

          <Routes>
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/book" element={<BookAppointmentPage />} />
            <Route path="/appointments" element={<DoctorAppointmentsPage />} />
            {/* Перенаправляем в зависимости от роли */}
            <Route
              path="*"
              element={
                user?.role === "DOCTOR" ? (
                  <Navigate to="/patients" />
                ) : (
                  <Navigate to="/book" />
                )
              }
            />
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
