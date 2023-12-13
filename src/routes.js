const express = require("express");
const authController = require("./controllers/auth");
const categoriesController = require("./controllers/categories");
const documentsController = require("./controllers/documents");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("Welcome to Jurisoft Legal Documents Management API");
});

routes.post("/signup", authController.signUp);
routes.post("/login", authController.login);

routes.post("/documents", documentsController.store);
routes.get("/documents", documentsController.index);
routes.get("/documents/:documentId", documentsController.show);
routes.delete("/documents/:documentId", documentsController.destroy);

routes.get("/categories", categoriesController.index);

module.exports = {
  routes,
};
