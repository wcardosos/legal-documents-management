const mongoose = require("mongoose");

const LawyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  },
  { timestamps: true }
);

const Lawyer = mongoose.model("Lawyer", LawyerSchema);

module.exports = Lawyer;
