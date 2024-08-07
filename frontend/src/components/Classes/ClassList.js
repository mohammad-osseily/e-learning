import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classService from "../../services/classService";
import enrollmentService from "../../services/enrollmentService";
import Swal from "sweetalert2";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState({});
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await classService.getClasses();
        setClasses(data);
      } catch (error) {
        console.error("Failed to fetch classes", error);
      }
    };

    fetchClasses();
  }, []);

  const handleEnroll = async (classId) => {
    try {
      await enrollmentService.createEnrollment({
        student: user._id,
        class: classId,
      });
      setEnrollmentStatus((prevStatus) => ({
        ...prevStatus,
        [classId]: "enrolled",
      }));
      Swal.fire({
        title: "Success!",
        text: "Enrolled in the class successfully",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to enroll in class", error);
      Swal.fire({
        title: "Error!",
        text: "Enrollment failed",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Available Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="border p-4 rounded shadow-lg bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
            <p className="mb-2">{classItem.description}</p>
            <p className="text-sm text-gray-600">
              Instructor: {classItem.instructor.name}
            </p>
            {enrollmentStatus[classItem._id] === "enrolled" ? (
              <p className="text-green-500 mt-2">Enrolled</p>
            ) : (
              <button
                onClick={() => handleEnroll(classItem._id)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mt-2"
              >
                Enroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
