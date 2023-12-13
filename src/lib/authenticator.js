const jwt = require("jsonwebtoken");

const authenticator = {
  generateToken: (lawyerId) => {
    const token = jwt.sign(
      {
        id: lawyerId,
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    return token;
  },

  getTokenInformation: (token) => {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    return {
      id: payload.id,
    };
  },
};

module.exports = authenticator;
