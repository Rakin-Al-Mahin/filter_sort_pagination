const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require("./routes/product.route.js");
const authRoute = require("./routes/auth.route.js");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from CRUD API Server!!");
});

// routes
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);

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
