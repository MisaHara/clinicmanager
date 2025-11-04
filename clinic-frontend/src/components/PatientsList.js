//import React, { useEffect, useState } from "react";
//import { getAllPatients } from "../api/patientApi";
//
//function PatientsList() {
//  const [patients, setPatients] = useState([]);
//
//  useEffect(() => {
//    const fetchPatients = async () => {
//      try {
//        const data = await getAllPatients();
//        setPatients(data);
//      } catch (error) {
//        console.error("Ошибка при загрузке пациентов:", error);
//      }
//    };
//    fetchPatients();
//  }, []);
//
//  const handleAddPatient = (newPatient) => {
//      setPatients((prev) => [...prev, newPatient]); // добавляем в массив
//    };
//  return (
//    <div style={{ padding: "20px" }}>
//      <h2>Список пациентов</h2>
//      {patients.length === 0 ? (
//        <p>Пациентов пока нет.</p>
//      ) : (
//        <ul>
//          {patients.map((p) => (
//            <li key={p.id}>
//              <strong>{p.name}</strong> — {p.age} лет
//            </li>
//          ))}
//        </ul>
//      )}
//    </div>
//  );
//}
//
//export default PatientsList;
