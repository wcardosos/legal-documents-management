const Category = require("../models/category");

const categoryService = {
  fetchAll: async () => {
    const categories = await Category.find({});

    return { categories };
  },
};

module.exports = categoryService;
