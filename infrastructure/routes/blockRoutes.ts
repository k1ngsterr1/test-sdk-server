import blockController from "@presentation/controllers/blockControllers";

const express = require("express");

const router = express.Router();

router.post("/add", (req, res) => blockController.addBlock(req, res));

router.get("/get-blocks", (req, res) => blockController.getBlocks(req, res));

router.delete("/delete/:id/:code", (req, res) =>
  blockController.deleteBlock(req, res)
);

router.patch("/update/:id", (req, res) =>
  blockController.updateBlock(req, res)
);

export default router;
