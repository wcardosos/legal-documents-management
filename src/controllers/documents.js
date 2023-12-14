const { z } = require("zod");
const documentService = require("../services/document");

const documentsController = {
  store: async (req, res, next) => {
    try {
      const createDocumentBodySchema = z.object({
        title: z.string(),
        description: z.string(),
        keywords: z.array(z.string()),
        categoryId: z.string(),
      });

      const { title, description, keywords, categoryId } =
        createDocumentBodySchema.parse(req.body);
      const { id: lawyerId } = req.user;

      await documentService.create({
        title,
        description,
        keywords,
        categoryId,
        lawyerId,
      });

      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      const { id: lawyerId } = req.user;

      const documents = await documentService.fetchAllByLawyerId(lawyerId);

      return res.json(documents);
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      const showDocumentParamSchema = z.object({
        documentId: z.string(),
      });

      const { documentId } = showDocumentParamSchema.parse(req.params);

      const document = await documentService.fetchById(documentId);

      return res.json(document);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const updateDocumentBodySchema = z.object({
        title: z.string(),
        description: z.string(),
        keywords: z.array(z.string()),
        categoryId: z.string(),
      });
      const updateDocumentParamSchema = z.object({
        documentId: z.string(),
      });

      const { title, description, keywords, categoryId } =
        updateDocumentBodySchema.parse(req.body);
      const { documentId } = updateDocumentParamSchema.parse(req.params);

      await documentService.update({
        id: documentId,
        title,
        description,
        keywords,
        categoryId,
      });

      return res.sendStatus(202);
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const destroyDocumentParamSchema = z.object({
        documentId: z.string(),
      });

      const { documentId } = destroyDocumentParamSchema.parse(req.params);

      await documentService.delete(documentId);

      return res.sendStatus(202);
    } catch (error) {
      next(error);
    }
  },
  history: async (req, res, next) => {
    try {
      const documentHistoryParamsSchema = z.object({
        documentId: z.string(),
      });

      const { documentId } = documentHistoryParamsSchema.parse(req.params);

      const documentHistory = await documentService.fetchHistory(documentId);

      return res.json(documentHistory);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = documentsController;
