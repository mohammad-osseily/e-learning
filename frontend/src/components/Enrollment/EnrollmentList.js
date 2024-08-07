import React, { useEffect, useState } from "react";
import enrollmentService from "../../services/enrollmentService";

function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const response = await enrollmentService.getEnrollments();
        setEnrollments(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEnrollments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Enrollments</h2>
      <ul className="space-y-4">
        {enrollments.map((enrollment) => (
          <li key={enrollment._id} className="border p-4 rounded shadow">
            {enrollment.class.title} - {enrollment.student.name} (
            {enrollment.student.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnrollmentList;
