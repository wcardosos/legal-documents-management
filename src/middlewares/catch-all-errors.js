const { ZodError } = require("zod");
const BaseError = require("../errors/base");

function catchAllErrors(error, req, res, next) {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ message: `${error.errors[0].path[0]} invalid` });
  }

  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: "Internal error" });
}

module.exports = catchAllErrors;
