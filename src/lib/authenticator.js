const jwt = require("jsonwebtoken");

const authenticator = {
  generateToken: (lawyerId, passwordHash) => {
    const token = jwt.sign(
      {
        id: lawyerId,
        passwordHash,
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    return token;
  },

  getTokenInformation: (token) => {
    const { id, passwordHash } = jwt.verify(token, process.env.JWT_KEY);
    return {
      id,
      passwordHash,
    };
  },
};

module.exports = authenticator;
