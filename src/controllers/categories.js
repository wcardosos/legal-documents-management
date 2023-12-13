const categoryService = require("../services/category");

const categoriesController = {
  index: async (req, res, next) => {
    try {
      const { categories } = await categoryService.fetchAll();

      return res.json(categories);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoriesController;
