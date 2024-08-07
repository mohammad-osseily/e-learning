import React, { useState, useEffect } from "react";
import withdrawalService from "../../services/withdrawalService";
import classService from "../../services/classService";

function WithdrawalForm() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [reason, setReason] = useState("");

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
      await withdrawalService.createWithdrawal({
        class: selectedClass,
        reason,
      });
      alert("Withdrawal request submitted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Request Withdrawal</h2>
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
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason for withdrawal"
        required
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default WithdrawalForm;
