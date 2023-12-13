const mongoose = require("mongoose");
const Document = require("../models/document");
const Lawyer = require("../models/lawyer");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://jurisoft:jurisoft@localhost:27017/legal-documents?authSource=admin"
    );
    console.log("Database connection was successfully established");

    Document.syncIndexes();
    console.log("Collections indexes was successfully created");
  } catch (error) {
    console.error("Error while trying to connect on database:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
