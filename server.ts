const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({ path: ".env" });

import path from "path";
import textRoutes from "@infrastructure/routes/textRoutes";
import blockRoutes from "@infrastructure/routes/blockRoutes";

const app = express();

export const buildRoute = path.join(__dirname, "templates/build/");
export const uploadPath = path.join(__dirname, "uploads");

// Разрешены все Origins
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Authorization", "Content-Type"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(express.json());

const port = process.env.PORT || 4000;

// Логика для текста
app.use("/api/text", textRoutes);

// Логика для блоков
app.use("/api/block", blockRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
