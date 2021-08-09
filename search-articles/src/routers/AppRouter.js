import dotenv from "dotenv";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Articles from "../components/Articles";
import Titles from "../components/Titles";
import Note from "../components/Note";
import NotFound from "../components/NotFound";
import { SearchContext } from "../context/searchContext";
import { ArticleNoteContext } from "../context/articleNoteContext";
import moment from "moment";
require("dotenv").config();

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchword: "",
      articlesFromGNews: [],
      searchWordsFromDB: [],
      articleTitlesFromMongo: [],
      titlesForTable: [],
      articleInfo: [],
      showSearch: true,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.sendTitleToDB = this.sendTitleToDB.bind(this);
    this.deleteTitle = this.deleteTitle.bind(this);
    this.forNote = this.forNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
  }

  componentDidMount() {
    // get articles from gNews, 24h old
    const time = moment().subtract(2, "days").toISOString().split(".")[0] + "Z";
    const token = process.env.REACT_APP_GN_TOKEN;
    fetch(
      `https://gnews.io/api/v4/search?q=news&in=content&lang=en&from=${time}&max=9&token=${token}`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
      });

    // get from mongoDB searchwords arr
    axios
      .get("http://localhost:5000/words")
      .then((response) => {
        const tempArr = [];
        response.data.map((object) => tempArr.push(object.word));
        this.setState({ searchWordsFromDB: tempArr });
        // console.log(
        //   "approuter-searchWordsFromDB",
        //   this.state.searchWordsFromDB
        // );
      })
      .catch((err) => {
        console.log(err);
      });

    // get titles from mongoDB
    axios.get("http://localhost:5000/articles").then((response) => {
      if (response.data.length > 0) {
        const arrTitles = [];
        response.data.map((object) => arrTitles.push(object.article));
        this.setState({
          articleTitlesFromMongo: arrTitles,
          titlesForTable: response.data,
        });

        console.log(
          "approuter-articleTitlesFromMongo",
          this.state.articleTitlesFromMongo
        );
        console.log("titlesForTable", this.state.titlesForTable);
      }
    });
  }

  handleSearch(searchword, language, from, to) {
    this.setState({
      searchword: searchword,
    });
    //console.log("searchword from handleSearch", searchword);

    // send search word to mongoDB
    const word = {
      word: searchword,
      count: 1,
    };
    axios
      .post("http://localhost:5000/words/add", word)
      .then((response) => console.log("response.data", response.data));

    // add word to front
    let temparr = this.state.searchWordsFromDB;
    temparr.push(searchword);
    this.setState({
      searchWordsFromDB: temparr,
    });
    //console.log("adding front", this.state.searchWordsFromDB);

    // get gNews articles by searchword

    let wordForSearching = searchword === "" ? "news" : searchword;
    const token = process.env.REACT_APP_GN_TOKEN;
    fetch(
      `https://gnews.io/api/v4/search?q=${wordForSearching}&in=content&lang=${language}&from=${from}&to=${to}&max=9&token=${token}`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
        //console.log(this.state.articlesFromGNews);
      });
    //console.log(this.state.articlesFromGNews);
  }

  // send title to mongoDB
  sendTitleToDB(title, url) {
    //front title arr
    let tempTitleArr = this.state.articleTitlesFromMongo;
    tempTitleArr.push(title);
    this.setState({
      articleTitlesFromMongo: tempTitleArr,
    });

    // send title to mongoDB
    const articleTitle = {
      article: title,
      count: 1,
      url: url,
      note: "",
    };
    const tempObj = this.state.titlesForTable.push(articleTitle);
    this.setState({
      titlesForTable: tempObj,
    });

    axios
      .post("http://localhost:5000/articles/add", articleTitle)
      .then((res) => console.log("res.data add titleToDb", res.data));
  }

  deleteTitle(id) {
    // delete title from mongoDB
    axios
      .delete(`http://localhost:5000/articles/${id}`)
      .then((res) => console.log(res.data));

    console.log("title id ", id);
    // delete from front
    const arr = this.state.titlesForTable.filter((obj) => obj._id !== id);
    this.setState({
      titlesForTable: arr,
    });
  }

  forNote(id) {
    const articleInfo = this.state.titlesForTable.filter(
      (obj) => obj._id === id
    );

    this.setState({
      articleInfo: articleInfo[0],
    });
    console.log("forNote id ", id);
    console.log("articleInfo", articleInfo);
    console.log("[0] ", articleInfo[0]);
  }

  addNote(id, note) {
    // update
    const updateArticle = {
      article: this.state.articleInfo.article,
      count: 1,
      url: this.state.articleInfo.url,
      note: note,
    };
    axios
      .post(`http://localhost:5000/articles/update/${id}`, updateArticle)
      .then((res) => console.log(res.data));

    //add new note to table
    const temp = this.state.titlesForTable.map((el) => {
      if (el._id === id) {
        el.note = note;
      }
      return el;
    });
    console.log("temp ", temp);

    this.setState({
      titlesForTable: temp,
    });
  }
  hideSearch(hide) {
    this.setState({ showSearch: hide });
  }
  render() {
    const searchContextValue = {
      handleSearch: this.handleSearch,
      searchWordsFromDB: this.state.searchWordsFromDB,
      articlesFromGNews: this.state.articlesFromGNews,
      articleTitlesFromMongo: this.state.articleTitlesFromMongo,
      sendTitleToDB: this.sendTitleToDB,
      titlesForTable: this.state.titlesForTable,
      deleteTitle: this.deleteTitle,
      showSearch: this.state.showSearch,
      hideSearch: this.hideSearch,
    };

    const articleNoteContext = {
      forNote: this.forNote,
      articleInfo: this.state.articleInfo,
      addNote: this.addNote,
      hideSearch: this.hideSearch,
    };

    return (
      <BrowserRouter>
        <SearchContext.Provider value={searchContextValue}>
          <Header />
          <Switch>
            <Route path="/" component={Articles} exact={true} />
            <ArticleNoteContext.Provider value={articleNoteContext}>
              <Route path="/titles" component={Titles} />
              <Route path="/note" component={Note} />
            </ArticleNoteContext.Provider>
            <Route component={NotFound} />
          </Switch>
        </SearchContext.Provider>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
