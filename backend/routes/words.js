const router = require("express").Router();
let Word = require("../models/word.model");

router.route("/").get((req, res) => {
  Word.find()
    .then((words) => res.json(words))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const word = req.body.word;
  const count = req.body.count;

  const newWord = new Word({ word, count });

  newWord
    .save()
    .then(() => res.json("Word added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Word.findById(req.params.id)
    .then((word) => res.json(word))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Word.findByIdAndDelete(req.params.id)
    .then(() => res.json("Word deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Word.findById(req.params.id)
    .then((word) => {
      word.word = req.body.word;
      word.count = Number(req.body.count);

      word
        .save()
        .then(() => res.json("Article updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
