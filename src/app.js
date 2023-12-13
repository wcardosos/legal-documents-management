const express = require("express");
const { routes } = require("./routes");
const connectDB = require("./database/config");
const dotenv = require("dotenv");
const catchAllErrors = require("./middlewares/catch-all-errors");
const authorize = require("./middlewares/authorization");

dotenv.config();

const app = express();

app.use(express.json());
app.use(authorize);
app.use(routes);
app.use(catchAllErrors);

app.listen(3333, () => {
  connectDB();
  console.log("Server running...");
});
