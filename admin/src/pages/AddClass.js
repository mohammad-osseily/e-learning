import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addClass } from "../store/classes/classesActions";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AddClass = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addClass({ title, description, instructor }));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <Navbar />
        <h2 className="text-2xl mb-6">Add Class</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border border-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="instructor">
              Instructor
            </label>
            <input
              type="text"
              id="instructor"
              className="w-full p-2 border border-gray-300 rounded"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
