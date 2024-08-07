import React, { useState } from "react";
import withdrawalService from "../../services/withdrawalService";

const WithdrawalForm = () => {
  const [classId, setClassId] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await withdrawalService.createWithdrawal({ class: classId, reason });
      // Handle further actions if needed
    } catch (err) {
      // Error handled in the service
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Request Withdrawal</h2>
      <input
        type="text"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
        placeholder="Class ID"
        required
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason for Withdrawal"
        required
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Submit Withdrawal Request
      </button>
    </form>
  );
};

export default WithdrawalForm;
