import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      const response = await axios.get("http://localhost:4000/api/withdrawals");
      setWithdrawals(response.data);
    };
    fetchWithdrawals();
  }, []);

  const handleApprove = async (id) => {
    await axios.patch(`http://localhost:4000/api/withdrawals/${id}`, {
      status: "approved",
    });
    setWithdrawals((prev) =>
      prev.filter((withdrawal) => withdrawal._id !== id)
    );
  };

  const handleReject = async (id) => {
    await axios.patch(`http://localhost:4000/api/withdrawals/${id}`, {
      status: "rejected",
    });
    setWithdrawals((prev) =>
      prev.filter((withdrawal) => withdrawal._id !== id)
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Withdrawals</h2>
      <ul className="space-y-2">
        {withdrawals.map((withdrawal) => (
          <li
            key={withdrawal._id}
            className="border-b py-2 flex justify-between items-center"
          >
            <span>
              {withdrawal.student.name} - {withdrawal.class.title}
            </span>
            <div>
              <button
                onClick={() => handleApprove(withdrawal._id)}
                className="bg-green-500 text-white px-4 py-1 rounded mr-2"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(withdrawal._id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageWithdrawals;
