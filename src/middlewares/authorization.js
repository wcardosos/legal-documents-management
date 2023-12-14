const UnauthorizedError = require("../errors/unauthorized");
const authenticator = require("../lib/authenticator");
const Lawyer = require("../models/lawyer");

async function authorize(req, res, next) {
  if (req.path === "/signup" || req.path === "/login") {
    next();
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new UnauthorizedError("Missing token");

  try {
    const authenticatedLawyerData = authenticator.getTokenInformation(token);

    const lawyer = await Lawyer.findById(authenticatedLawyerData.id);

    if (!lawyer || lawyer.password !== authenticatedLawyerData.passwordHash)
      throw new UnauthorizedError("Invalid token provided");

    req.user = authenticatedLawyerData;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorize;
