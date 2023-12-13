const UnauthorizedError = require("../errors/unauthorized");
const authenticator = require("../lib/authenticator");

function authorize(req, res, next) {
  if (req.path === "/signup" || req.path === "/login") {
    next();
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new UnauthorizedError("Missing token");

  try {
    const authenticatedLawyerData = authenticator.getTokenInformation(token);

    req.user = authenticatedLawyerData;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorize;
