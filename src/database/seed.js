const connectDB = require("./config");
const Category = require("../models/category");

connectDB().then(async () => {
  const categoriesSamples = [
    { name: "Petição inicial" },
    { name: "Contestação" },
    { name: "Impugnação" },
    { name: "Apelação" },
    { name: "Contrarrazão" },
    { name: "Alvará judicial" },
    { name: "Certidão de trânsito em julgado" },
    { name: "Manifestação" },
  ];

  await Category.deleteMany({});
  await Category.insertMany(categoriesSamples);

  console.log("Categories was created successfully");
  process.exit(1);
});
