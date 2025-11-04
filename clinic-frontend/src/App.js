import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // исправлено
import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/patients" style={{ marginRight: "10px" }}>Добавить пациента</Link>
        <Link to="/doctors">Записаться к доктору</Link>
      </nav>

      <Routes>
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
