import mongoose from "mongoose";
import multer from "multer";
import path from "path";

// Project Schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "completed"],
  },
  deadline: {
    type: Date,
    required: true,
  },
  payment: {
    type: String,
    default: "not paid",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(process.cwd(), "public/uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// CSV File Filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".csv") {
    return cb(new Error("Only CSV files are allowed!"), false);
  }
  cb(null, true);
};

// Initialize Multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("csvFile");

// Project Model
const projectModel = mongoose.model("Project", projectSchema);
export default projectModel;
