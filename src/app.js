const express = require("express");
const { routes } = require("./routes");
const connectDB = require("./database/config");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  connectDB();
  console.log("Server running...");
});
