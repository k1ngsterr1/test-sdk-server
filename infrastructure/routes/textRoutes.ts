import textController from "@presentation/controllers/textControllers";

const express = require("express");

const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date()
      .toJSON("kz-kz")
      .slice(0, 10)
      .replace(/:/g, "-");
    const hours = new Date().getHours().toString().padStart(2, "0");
    const minutes = new Date().getHours().toString().padStart(2, "0");
    const seconds = new Date().getSeconds().toString().padStart(2, "0");
    const currentTime = `H=${hours}-M=${minutes}-S=${seconds}`;
    let result =
      currentDate.toString() + "-" + currentTime + "-" + file.originalname;
    req.body.image = result;
    cb(null, result);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), (req, res) =>
  textController.addText(req, res)
);

router.get("/get-texts", (req, res) => textController.getTexts(req, res));

router.delete("/delete/:id/:code", (req, res) =>
  textController.deleteText(req, res)
);

router.patch("/update/:id", upload.single("image"), (req, res) =>
  textController.updateText(req, res)
);

export default router;
