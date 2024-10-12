A powerful backend API for managing Freelance App System, featuring robust CRUD operations and bulk processing capabilities.

Table of Contents

Features
Technologies Used
Installation
Usage
API Endpoints


Features
Create, read, update, and delete projects
Bulk upload and download of projects using CSV files
User-specific project retrieval
Payment processing for projects


Technologies Used
Node.js: JavaScript runtime for building scalable applications
Express: Fast and minimalist web framework for Node.js
MongoDB: NoSQL database for storing project data
Mongoose: ODM for MongoDB, providing a schema-based solution
Multer: Middleware for handling multipart/form-data, used for file uploads (csv)
JSON Web Token (JWT): For secure authentication
Bcrypt: For hashing passwords


Installation
To get started with the Freelance App System, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/lokeshshinde500/FreelancerApp-Fullstack

frontend deployement link : https://starlit-genie-5e247d.netlify.app/
backend deployement link : https://freelancerapp-yfd1.onrender.com/

cd library-system
Install the dependencies:


npm install

Create a .env file in the root directory and set up your environment variables.

Start the application:

npm run dev

Usage
API Endpoints

Method	Endpoint	Description

POST	/	    Create a new project

GET    	/all	Get all projects

GET 	/	    Get projects created by a specific user

GET	    /:      projectId/single	Get a single project by project ID

PATCH	/:      projectId	Update a project by project ID

DELETE	/:      projectId	Delete a project by project ID

PATCH	/:      projectId/payment	Make payment for a project

POST	/upload/bulk	Upload bulk projects using CSV file

GET	/download/bulk	Download bulk projects in CSV file


Example sample data
for login 

  email =  "l@gmail.com",
  password =  123