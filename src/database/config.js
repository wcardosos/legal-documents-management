const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://jurisoft:jurisoft@localhost:27017/legal-documents?authSource=admin"
    );
    console.log("Conexão com o banco de dados estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
