import React, { useEffect, useState } from "react";
import withdrawalService from "../../services/withdrawalService";
import Swal from "sweetalert2";

const Withdrawals = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const data = await withdrawalService.getWithdrawals();
        setWithdrawalRequests(data);
      } catch (error) {
        console.error("Failed to fetch withdrawal requests", error);
      }
    };

    fetchWithdrawals();
  }, []);

  const handleWithdrawalUpdate = (requestId, status) => {
    setWithdrawalRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === requestId ? { ...request, status } : request
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Pending Withdrawal Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {withdrawalRequests
          .filter((request) => request.status === "pending")
          .map((request) => (
            <div
              key={request._id}
              className="border p-4 rounded shadow-lg bg-white"
            >
              <h3 className="text-xl font-semibold mb-2">
                {request.class.title}
              </h3>
              <p className="mb-2">{request.class.description}</p>
              <p className="text-yellow-500 mt-2">Withdrawal Status: Pending</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() =>
                    handleWithdrawalUpdate(request._id, "approved")
                  }
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleWithdrawalUpdate(request._id, "rejected")
                  }
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Withdrawals;
