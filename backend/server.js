const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const { router } = require("./routes/product.route");
const cors = require("cors");
const path = require("path");

const app = express();

// configure dotenv:-
dotenv.config();
const PORT = process.env.PORT || 5000;

// for the delete:-
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"],
  })
);

// for the upadte:-
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// middleware use:- allows us to accept JSON data in the req.body;
app.use(express.json());

// routing:-
app.use("/api/products", router);

if (process.env.NODE_ENV === "production") {
  const rootDir = path.resolve(__dirname, "..");
  const frontendBuildPath = path.join(rootDir, "frontend", "build");
  const indexPath = path.join(frontendBuildPath, "index.html");

  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

// listening server:-
app.listen(PORT, () => {
  connectDB();
  console.log("Server running at port http://localhost:" + PORT);
});

// anku123 ankusingh
