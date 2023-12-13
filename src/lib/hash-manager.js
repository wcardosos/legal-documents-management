const bcrypt = require("bcryptjs");

const hashManager = {
  encrypt: async (text) => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const encryptedText = await bcrypt.hash(text, salt);

    return encryptedText;
  },

  compare: async (text, hash) => {
    const compareResult = await bcrypt.compare(text, hash);

    return compareResult;
  },
};

module.exports = hashManager;
