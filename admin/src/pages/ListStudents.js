import React, { useEffect, useState } from "react";
import axios from "axios";

const ListStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get("http://localhost:4000/api/students");
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Students Enrolled</h2>
      <ul className="space-y-2">
        {students.map((student) => (
          <li key={student._id} className="border-b py-2">
            {student.name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListStudents;
