import React, { useEffect, useState } from "react";
import enrollmentService from "../../services/enrollmentService";
import withdrawalService from "../../services/withdrawalService";
import Swal from "sweetalert2";

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await enrollmentService.getEnrollments();
        setEnrollments(data);
      } catch (error) {
        console.error("Failed to fetch enrollments", error);
      }
    };

    const fetchWithdrawals = async () => {
      try {
        const data = await withdrawalService.getWithdrawals();
        setWithdrawalRequests(data);
      } catch (error) {
        console.error("Failed to fetch withdrawal requests", error);
      }
    };

    fetchEnrollments();
    fetchWithdrawals();
  }, []);

  const handleWithdrawal = async (classId) => {
    try {
      await withdrawalService.createWithdrawal({
        class: classId,
        reason: "User requested withdrawal",
      });
      setWithdrawalRequests((prevRequests) => [
        ...prevRequests,
        { class: { _id: classId }, status: "pending" },
      ]);
      Swal.fire({
        title: "Success!",
        text: "Withdrawal request submitted successfully",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to request withdrawal", error);
      Swal.fire({
        title: "Error!",
        text: "Withdrawal request failed",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const getClassById = (classId) =>
    enrollments.find((enrollment) => enrollment.class._id === classId)?.class;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Enrolled Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {enrollments.map((enrollment) => (
          <div
            key={enrollment.class._id}
            className="border p-4 rounded shadow-lg bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">
              {enrollment.class.title}
            </h3>
            <p className="mb-2">{enrollment.class.description}</p>
            {withdrawalRequests.some(
              (request) =>
                request.class._id === enrollment.class._id &&
                request.status === "pending"
            ) ? (
              <p className="text-yellow-500 mt-2">Withdrawal Status: Pending</p>
            ) : (
              <button
                onClick={() => handleWithdrawal(enrollment.class._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 mt-2"
              >
                Withdraw
              </button>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-6">Pending Withdrawal Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {withdrawalRequests
          .filter((request) => request.status === "pending")
          .map((request) => {
            const classItem = getClassById(request.class._id);
            return (
              <div
                key={request.class._id}
                className="border p-4 rounded shadow-lg bg-white"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {classItem.title}
                </h3>
                <p className="mb-2">{classItem.description}</p>
                <p className="text-yellow-500 mt-2">
                  Withdrawal Status: Pending
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EnrollmentList;
