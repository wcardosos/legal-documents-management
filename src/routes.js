const express = require("express");
const authController = require("./controllers/auth");
const categoriesController = require("./controllers/categories");
const documentsController = require("./controllers/documents");
const lawyersController = require("./controllers/lawyers");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("Welcome to Jurisoft Legal Documents Management API");
});

routes.post("/signup", authController.signUp);
routes.post("/login", authController.login);
routes.patch("/change-password", authController.changePassword);

routes.post("/documents", documentsController.store);
routes.get("/documents", documentsController.index);
routes.get("/documents/:documentId", documentsController.show);
routes.get("/documents/:documentId/history", documentsController.history);
routes.put("/documents/:documentId", documentsController.update);
routes.delete("/documents/:documentId", documentsController.destroy);

routes.get("/me", lawyersController.show);

routes.get("/categories", categoriesController.index);

module.exports = {
  routes,
};
