const mongoose = require("mongoose");

const DocumentHistorySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
  },
  { timestamps: true }
);

const DocumentHistory = mongoose.model(
  "DocumentHistory",
  DocumentHistorySchema
);

module.exports = DocumentHistory;
