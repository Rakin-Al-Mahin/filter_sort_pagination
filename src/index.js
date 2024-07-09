const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./app/routes/routes.index.js");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from CRUD API Server!!");
});

// main route
app.use("/api", routes);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

// database connection
mongoose
  .connect(
    "mongodb+srv://rakin992raj:Xgm5spmXDp6k8TwH@backenddb.t5nuxlz.mongodb.net/CRUD-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
