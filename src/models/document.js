const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    documentHistories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DocumentHistory" },
    ],
  },
  { timestamps: true }
);

DocumentSchema.index({ title: 1, keywords: 1 });

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
