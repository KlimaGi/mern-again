const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // connect to mongoDB

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// connect files from routes
const articlesRouter = require("./routes/articles");
const wordsRouter = require("./routes/words");

app.use("/articles", articlesRouter);
app.use("/words", wordsRouter);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
