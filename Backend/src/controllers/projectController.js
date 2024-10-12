import csv from "csvtojson";
import CsvParser from "json2csv";
import projectModel from "../models/projectModel.js";

// <--------- Normal CRUD operations --------->

// create new project //
export const createProject = async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;

    // all fields are required
    if (!title || !description || !deadline || !status) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    // create new project if all detail come
    const newProject = {
      title,
      description,
      deadline,
      status: status,
      created_by: req.user.id,
    };

    const createProject = await projectModel.create(newProject);

    return res.status(201).json({
      message: "Project created successfully.",
      project: createProject,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! create project",
      success: false,
      error: error.message,
    });
  }
};

// Read projects created by spacific user //
export const getMyProjects = async (req, res) => {
  try {
    const myProjects = await projectModel.find({ created_by: req.user.id });
    console.log(req.user.id);
    if (!myProjects) {
      return res.status(404).json({
        message: "Projects are not founds",
        success: false,
      });
    }

    return res.status(200).json({
      myProjects: myProjects,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
      error: error.message,
    });
  }
};

// Update project by projecId //
export const updateProject = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found!",
        success: false,
      });
    }

    // new data
    const { title, description, status, deadline } = req.body;

    // updating new data
    project.title = title || project.title;
    project.description = description || project.description;
    project.status = status || project.status;
    project.deadline = deadline || project.deadline;

    // saving new document
    const updatedProject = await project.save({ new: true });

    return res.status(200).json({
      message: "Project updated successfully.",
      project: updatedProject,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
      error: error.message,
    });
  }
};

// Delete project by projecId //
export const deleteProject = async (req, res) => {
  try {
    const project = await projectModel.findByIdAndDelete(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Project deleted successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
      error: error.message,
    });
  }
};

// Read all projects //
export const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();

    if (!projects) {
      return res.status(404).json({
        message: "Projects are not founds",
        success: false,
      });
    }

    return res.status(200).json({
      projects: projects,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
      error: error.message,
    });
  }
};

// Read single project by projecId //
export const getProject = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found!",
        success: false,
      });
    }

    return res.status(200).json({
      project: project,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
      error: error.message,
    });
  }
};

// make payment
export const makePayment = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found!",
        success: false,
      });
    }

    if (project.payment === "paid") {
      return res.status(404).json({
        message: "already paid for this project!",
        success: false,
      });
    }

    // update payment field
    await projectModel.findByIdAndUpdate(req.params.projectId, {
      payment: "paid",
    });

    return res.status(200).json({
      message: "Payment successfully completed.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
      error: error.message,
    });
  }
};

// <--------- for bulk opearation  --------->

// upload bulk data //
export const uploadBulk = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "No CSV file found!", success: false });
    }

    // Parse CSV file
    let response;
    try {
      response = await csv().fromFile(req.file.path);
    } catch (csvError) {
      return res.status(400).json({ message: "Error parsing CSV file.", success: false, error: csvError.message });
    }

    const data = [];
    for (const row of response) {
      const deadline = new Date(row.deadline);

      // Validate date format
      if (isNaN(deadline.getTime())) {
        return res.status(400).json({
          message: `Invalid date format in row with title: ${row.title}`,
          success: false,
        });
      }

      data.push({
        title: row.title,
        description: row.description,
        status: row.status,
        deadline: deadline, // Use the parsed date
        payment: row.payment,
        created_by: req.user.id,
      });
    }

    // Insert data into the database
    try {
      await projectModel.insertMany(data);
    } catch (dbError) {
      return res.status(500).json({
        message: "Database insertion error",
        success: false,
        error: dbError.message,
      });
    }

    // Successful response
    return res.status(201).json({
      message: "CSV file uploaded successfully.",
      success: true,
    });

  } catch (error) {
    // General catch-all for unexpected errors
    return res.status(500).json({
      message: "Internal server error while uploading projects.",
      success: false,
      error: error.message,
    });
  }
};

// download bulk data //
export const downloadBulk = async (req, res) => {
  try {
    const data = [];

    const projectData = await projectModel.find({ created_by: req.user.id });

    projectData.forEach((value) => {
      const { title, description, status, deadline, payment, created_by } =
        value;
      data.push({ title, description, status, deadline, payment, created_by });
    });

    const csvFields = [
      "Title",
      "Description",
      "Status",
      "Deadline",
      "Payment",
      "Created_by",
    ];
    const csvParser = new CsvParser.Parser({ csvFields });
    const csvData = csvParser.parse(data);

    // setting headers
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=projectData.csv"
    );
    return res.status(200).end(csvData);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! download csv!",
      success: false,
      error: error.message,
    });
  }
};
