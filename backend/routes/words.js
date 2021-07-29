const router = require("express").Router();
let Word = require("../models/word.model");

router.route("/").get((req, res) => {
  Word.find()
    .then((words) => res.json(words))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const word = req.body.word;

  const newWord = new Word({ word });

  newWord
    .save()
    .then(() => res.json("Word added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
