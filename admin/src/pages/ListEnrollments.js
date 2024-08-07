import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollments } from "../store/enrollments/enrollmentsActions";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ListEnrollments = () => {
  const dispatch = useDispatch();
  const enrollments = useSelector((state) => state.enrollments.enrollments);
  const loading = useSelector((state) => state.enrollments.loading);
  const error = useSelector((state) => state.enrollments.error);

  useEffect(() => {
    dispatch(getEnrollments());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <Navbar />
        <h2 className="text-2xl mb-6">List Enrollments</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Class</th>
              <th className="py-2">Student</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment._id}>
                <td className="py-2">{enrollment.class.title}</td>
                <td className="py-2">{enrollment.student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEnrollments;
