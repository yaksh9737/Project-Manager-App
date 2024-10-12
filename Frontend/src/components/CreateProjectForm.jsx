import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Using useNavigate for programmatic navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //   handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7890/api/project",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      navigate("/home"); // Navigate to the home page after successful form submission
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setFormData({
        title: "",
        description: "",
        deadline: "",
        status: "",
      });
      setLoading(false);
    }
  };

  //   handle csv uploads
  const handleCsv = async (e) => {
    e.preventDefault();
    console.log(csvFile);
    setLoading(true);
    if (csvFile.type !== "text/csv") {
      setLoading(false);
      return toast.error("Only CSV file allowed!");
    }

    try {
      const formData = new FormData();
      formData.append('file', csvFile);

      const response = await axios.post(
        "http://localhost:7890/api/project/upload/bulk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error uploading CSV');
    } finally {
      setCsvFile(null);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-cyan-950 shadow-md rounded-lg p-8 max-w-md w-full border-4 border-sky-600"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Project</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-white"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Project Title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-white"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Project Description"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-white"
            htmlFor="deadline"
          >
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-white"
            htmlFor="status"
          >
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-fuchsia-950 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Please wait" : "Create Project"}
        </button>

        <div className="mt-1">
          <p className="text-center text-white">OR</p>
          <div className="flex items-center">
            <input
              type="file"
              name="csvFile"
              onChange={(e) => {
                setCsvFile(e.target.files[0]);
              }}
            />
            <button
              type="submit"
              className="p-2 bg-fuchsia-950 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 text-sm"
              disabled={loading}
              onClick={handleCsv}
            >
              {loading ? "Please wait" : "Upload CSV"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
