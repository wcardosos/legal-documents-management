const express = require("express");
const authController = require("./controllers/auth");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("Welcome to Jurisoft Legal Documents Management API");
});

routes.post("/signup", authController.signUp);
routes.post("/login", authController.login);

module.exports = {
  routes,
};
