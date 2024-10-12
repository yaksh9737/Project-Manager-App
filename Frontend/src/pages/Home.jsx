import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const token = localStorage.getItem("token");
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch projects from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7890/api/project", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyProjects(response.data.myProjects);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle CSV download
  const downloadCsv = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7890/api/project/download/bulk",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Ensure the response is a blob
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "projectData.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // Clean up URL object
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred while downloading the file."
      );
    }
  };

  // Handle project deletion
  const handleDelete = (id) => {
    setMyProjects((prevProjects) => prevProjects.filter((proj) => proj._id !== id));
  };

  return (
    <>
      <section className="section-home bg-black h-screen">
        <div className="container mx-auto px-5">
        

          <div className="flex flex-col gap-1">
            {loading ? (
              <p>Loading projects...</p>
            ) : (
              myProjects.map((project) => (
                <ProjectCard key={project._id} project={project} onDelete={handleDelete} />
              ))
            )}
          </div>
          <button
            className="button bg-red-950 text-white p-2 rounded-sm mt-2 hover:bg-green-600 transition"
            onClick={downloadCsv}
          >
            Download CSV file
          </button>
        </div>
      </section>
    </>
  );
}
