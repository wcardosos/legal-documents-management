const lawyerService = require("../services/lawyer");

const lawyersController = {
  show: async (req, res, next) => {
    try {
      const { id } = req.user;
      const lawyer = await lawyerService.fetchById(id);

      return res.json(lawyer);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = lawyersController;
