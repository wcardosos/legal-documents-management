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
};

module.exports = documentsController;
