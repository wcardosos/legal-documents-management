const Lawyer = require("../models/lawyer");
const Category = require("../models/category");
const Document = require("../models/document");
const DocumentHistory = require("../models/document-history");
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

    const createDocumentHistory = await DocumentHistory.create({
      description: `The document was created on ${newDocument.createdAt.toLocaleString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`,
      document: newDocument._id,
    });

    newDocument.documentHistories.push(createDocumentHistory._id);
    newDocument.save();
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
  update: async ({ id, title, description, keywords, categoryId }) => {
    const category = await Category.findById(categoryId);
    if (!category) throw new NotFoundError("Category not found");

    const documentBeforeUpdate = await Document.findOneAndUpdate(
      { _id: id },
      {
        $set: { title, description, keywords, category: categoryId },
        $inc: { version: 1 },
      }
    );

    if (!documentBeforeUpdate) throw new NotFoundError("Document not found");

    if (documentBeforeUpdate.category.toString() !== categoryId) {
      const previousCategory = await Category.findById(
        documentBeforeUpdate.category
      );

      category.documents.push(id);
      await category.save();

      previousCategory.documents = previousCategory.documents.filter(
        (documentId) => documentId.toString() !== id
      );
      await previousCategory.save();
    }

    const createDocumentHistory = await DocumentHistory.create({
      description: `The document was updated on ${new Date().toLocaleString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`,
      document: id,
    });

    await Document.updateOne(
      { id },
      {
        documentHistories: [
          ...documentBeforeUpdate.documentHistories,
          createDocumentHistory._id,
        ],
      }
    );
  },
  delete: async (id) => {
    const result = await Document.deleteOne({ _id: id });

    if (result.deletedCount === 0)
      throw new NotFoundError("Document not found");
  },
  fetchHistory: async (id) => {
    const documentHistory = await DocumentHistory.find({ document: id });

    return documentHistory;
  },
};

module.exports = documentService;
