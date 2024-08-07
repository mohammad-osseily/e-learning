import React, { useEffect, useState } from "react";
import classService from "../../services/classService";
import { Link } from "react-router-dom";

function ClassList() {
  const [classes, setClasses] = useState([]);

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

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Classes</h2>
      <ul className="space-y-4">
        {classes.map((classItem) => (
          <li key={classItem._id} className="border p-4 rounded shadow">
            <Link to={`/classes/${classItem._id}`} className="text-blue-500">
              {classItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassList;
