import React, { useState, useEffect } from "react";
import enrollmentService from "../../services/enrollmentService";
import classService from "../../services/classService";

function EnrollmentForm() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await classService.getClasses();
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enrollmentService.createEnrollment({ class: selectedClass });
      alert("Enrolled successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Enroll in a Class</h2>
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        required
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="">Select a class</option>
        {classes.map((classItem) => (
          <option key={classItem._id} value={classItem._id}>
            {classItem.title}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Enroll
      </button>
    </form>
  );
}

export default EnrollmentForm;
