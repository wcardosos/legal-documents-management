const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("Welcome to Jurisoft Legal Documents Management API");
});

module.exports = {
  routes,
};
