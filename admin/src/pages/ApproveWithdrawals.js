import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
} from "../store/withdrawals/withdrawalsActions";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ApproveWithdrawals = () => {
  const dispatch = useDispatch();
  const withdrawals = useSelector((state) => state.withdrawals.withdrawals);
  const loading = useSelector((state) => state.withdrawals.loading);
  const error = useSelector((state) => state.withdrawals.error);

  useEffect(() => {
    dispatch(getWithdrawals());
  }, [dispatch]);

  const handleApprove = (withdrawalId) => {
    dispatch(approveWithdrawal(withdrawalId));
  };

  const handleReject = (withdrawalId) => {
    dispatch(rejectWithdrawal(withdrawalId));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <Navbar />
        <h2 className="text-2xl mb-6">Approve Withdrawals</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Class</th>
              <th className="py-2">Student</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal._id}>
                <td className="py-2">{withdrawal.class.title}</td>
                <td className="py-2">{withdrawal.student.name}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleApprove(withdrawal._id)}
                    className="bg-green-500 text-white p-2 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(withdrawal._id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveWithdrawals;
