const Lawyer = require("../models/lawyer");
const Category = require("../models/category");
const Document = require("../models/document");
const NotFoundError = require("../errors/not-found");

const documentService = {
  create: async ({ title, description, keywords, lawyerId, categoryId }) => {
    const lawyer = await Lawyer.findById(lawyerId);

    if (!lawyer) throw new NotFoundError("Lawyer not found");

    const category = await Category.findById(categoryId);

    if (!category) throw new NotFoundError("Category not found");

    const newDocument = await Document.create({
      title,
      description,
      keywords,
      version: 1,
      lawyer: lawyer._id,
      category: category._id,
    });

    lawyer.documents.push(newDocument._id);
    await lawyer.save();

    category.documents.push(newDocument._id);
    await category.save();
  },
  fetchAllByLawyerId: async (lawyerId) => {
    const documentsFromLawyer = await Document.find({
      lawyer: lawyerId,
    });

    return documentsFromLawyer;
  },

  fetchById: async (id) => {
    const document = await Document.findById(id);

    if (!document) throw new NotFoundError("Document not found");

    return document;
  },
  delete: async (id) => {
    const result = await Document.deleteOne({ _id: id });

    if (result.deletedCount === 0)
      throw new NotFoundError("Document not found");
  },
};

module.exports = documentService;
