const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const mongodb = require("./library/db");
const v1 = require("./routes/v1");
const swagger = require("./swagger-ui/swagger");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Static route for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/v1", v1);
app.use("/swagger", swagger);

mongodb();

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
