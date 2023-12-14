const Lawyer = require("../models/lawyer");

const lawyerService = {
  fetchById: async (id) => {
    const lawyer = await Lawyer.findById(id);

    return lawyer;
  },
};

module.exports = lawyerService;
