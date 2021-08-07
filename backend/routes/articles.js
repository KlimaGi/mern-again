const router = require("express").Router();
let Article = require("../models/article.model");

router.route("/").get((req, res) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const article = req.body.article;
  const count = req.body.count;
  const url = req.body.url;
  const note = req.body.note;

  const newArticle = new Article({ article, count, url, note });

  newArticle
    .save()
    .then(() => res.json("Article added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Article.findById(req.params.id)
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.json("Article deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      article.article = req.body.article;
      article.count = Number(req.body.count);
      article.url = req.body.url;
      article.note = req.body.note;

      article
        .save()
        .then(() => res.json("Article updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
