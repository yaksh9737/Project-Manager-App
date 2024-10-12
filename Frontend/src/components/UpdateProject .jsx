import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProject = () => {
  const token = localStorage.getItem("token");
  const location = useLocation(); // Get the project details passed via navigate
  const navigate = useNavigate();

  const { project } = location.state; // Get project from location state
  const {
    _id,
    title: initialTitle,
    description: initialDescription,
    deadline: initialDeadline,
    status: initialStatus,
    payment: initialPayment,
  } = project;

  // State to manage form data
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [deadline, setDeadline] = useState(initialDeadline);
  const [status, setStatus] = useState(initialStatus);
  const [payment, setPayment] = useState(initialPayment);

  // Function to handle payment update
  const makePayment = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:7890/api/project/${id}/payment`, // Adjust the endpoint as needed
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayment("paid"); // Update payment status
      toast.success(response.data.message); // Show success message
    } catch (error) {
      console.log(error);
      toast.warn(error.response?.data?.message || "Payment failed"); // Show error message
    }
  };

  // Handle form submission for updating project
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update project object with new values
    const updatedProject = {
      title,
      description,
      deadline,
      status,
      payment,
    };

    try {
      const response = await axios.patch(
        `http://localhost:7890/api/project/${_id}`,
        updatedProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message); // Show success message
      navigate("/home"); // Redirect to the home page after updating
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed"); // Show error message
    }
  };

  return (
    <div className="bg-black h-screen p-6">
      <div className="container mx-auto  shadow-md rounded-lg p-8 max-w-md w-full bg-cyan-950 pt-10 border-4 border-sky-600">
      <h2 className="text-2xl font-bold mb-6 text-white">Update Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-white">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-white">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-white">
            Deadline:
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline.split("T")[0]} // format date for input field
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Status Select */}
        <div>
          <label htmlFor="status" className="block text-white">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {/* Payment Select */}
        <div>
          <label htmlFor="payment" className="block text-white">
            Payment:
          </label>
          <select
            id="payment"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
        
          >
            <option value="not paid">Not Paid</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        {/* Payment Button */}
      <div className="flex justify-between">
      {payment === "not paid" && (
          <button
            type="button"
            onClick={() => makePayment(_id)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Make Payment
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update Project
        </button>
      </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateProject;
