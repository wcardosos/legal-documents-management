const Lawyer = require("../models/lawyer");
const hashManager = require("../lib/hash-manager");
const authenticator = require("../lib/authenticator");
const BadRequestError = require("../errors/bad-request");
const UnauthorizedError = require("../errors/unauthorized");

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

    const token = authenticator.generateToken(
      newLawyer._id,
      newLawyer.password
    );

    return { token };
  },
  login: async ({ email, password }) => {
    const lawyer = await Lawyer.findOne({ email });

    if (!lawyer)
      throw new UnauthorizedError(`Lawyer with email ${email} was not found`);

    const isPasswordsMatch = await hashManager.compare(
      password,
      lawyer.password
    );

    if (!isPasswordsMatch) throw new UnauthorizedError("Incorrect password");

    const token = authenticator.generateToken(lawyer._id, lawyer.password);

    return { token };
  },
  changePassword: async (lawyerId, newPassword) => {
    const newPasswordEncrypted = await hashManager.encrypt(newPassword);

    await Lawyer.findByIdAndUpdate(lawyerId, {
      password: newPasswordEncrypted,
    });
  },
};

module.exports = authService;
