import React, { useState } from "react";
import enrollmentService from "../../services/enrollmentService";

const EnrollmentForm = () => {
  const [classId, setClassId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enrollmentService.createEnrollment({ class: classId });
      // Handle further actions if needed
    } catch (err) {
      // Error handled in the service
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Enroll in a Class</h2>
      <input
        type="text"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
        placeholder="Class ID"
        required
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Enroll
      </button>
    </form>
  );
};

export default EnrollmentForm;
