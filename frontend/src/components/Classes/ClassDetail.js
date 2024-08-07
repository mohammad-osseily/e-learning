import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classService from "../../services/classService";

function ClassDetail() {
  const { id } = useParams();
  const [classItem, setClassItem] = useState(null);

  useEffect(() => {
    async function fetchClass() {
      try {
        const response = await classService.getClassById(id);
        setClassItem(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchClass();
  }, [id]);

  if (!classItem) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{classItem.title}</h2>
      <p className="mb-4">{classItem.description}</p>
      <p className="text-gray-700">
        Instructor: {classItem.instructor.name} ({classItem.instructor.email})
      </p>
    </div>
  );
}

export default ClassDetail;
