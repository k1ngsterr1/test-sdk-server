import textController from "@presentation/controllers/textControllers";

const express = require("express");

const router = express.Router();

router.post("/add", (req, res) => textController.addText(req, res));

router.get("/get-texts", (req, res) => textController.getTexts(req, res));

router.delete("/delete/:id/:code", (req, res) =>
  textController.deleteText(req, res)
);

router.patch("/update/:id", (req, res) => textController.updateText(req, res));

export default router;
