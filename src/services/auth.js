const Lawyer = require("../models/lawyer");
const hashManager = require("../lib/hash-manager");
const authenticator = require("../lib/authenticator");
const BadRequestError = require("../errors/bad-request");

const authService = {
  signUp: async ({ name, email, password }) => {
    const lawyerWithSameEmail = await Lawyer.findOne({ email });

    if (lawyerWithSameEmail)
      throw new BadRequestError(
        "A lawyer with the e-mail provided already exists"
      );

    const newLawyer = await Lawyer.create({
      name,
      email,
      password: await hashManager.encrypt(password),
    });

    const token = authenticator.generateToken(newLawyer._id);

    return { token };
  },
};

module.exports = authService;
