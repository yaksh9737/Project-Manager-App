import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const ProjectCard = ({ project, onDelete }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigate

  // Destructure project properties
  const {
    _id,
    title,
    description,
    deadline,
    payment: initialPayment,
    status: initialStatus,
  } = project;

  // Format date to local date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date
  };

  // Delete project function
  const deleteProject = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7890/api/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message); // Show success message
      onDelete(id); // Notify parent to remove project from the list
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete failed"); // Show error message
    }
  };

  // Navigate to update page
  const handleUpdate = () => {
    navigate(`/home/update-project/${_id}`, { state: { project } });
  };

  return (
    <div className="bg-cyan-950 shadow-lg rounded-lg p-6 m-4 border-2 border-cyan-600">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl text-white font-bold mb-2">{title}</h2>
        </div>
        <div>
          <span
            className={`px-2 py-1 mx-1 rounded-full text-xs ${
              initialStatus === "completed" ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            {initialStatus}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              initialPayment === "paid" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {initialPayment}
          </span>
        </div>
      </div>
      <p className="text-white mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white">Deadline: {formatDate(deadline)}</p>
        </div>
        <div className="flex items-center gap-2 text-white">
          {/* Update Button */}
          <button
            className="px-2 py-1 rounded-full text-xs bg-blue-500 hover:bg-blue-700 transition"
            onClick={handleUpdate}
          >
            Update
          </button>

          {/* Delete Button */}
          <button
            className="px-2 py-1 rounded-full text-xs bg-red-600 hover:bg-red-800 transition"
            onClick={() => deleteProject(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
