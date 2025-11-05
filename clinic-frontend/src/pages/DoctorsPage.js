import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке докторов:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Записаться к доктору</h2>

      {doctors.length === 0 ? (
        <p>Доктора пока не найдены.</p>
      ) : (
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.id}>
              <strong>{doctor.username}</strong>
              {doctor.specialization && (
                <> — {doctor.specialization}</>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorsPage;
