import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Articles from "../components/Articles";
import Titles from "../components/Titles";
import NotFound from "../components/NotFound";
import { SearchContext } from "../context/searchContext";
import moment from "moment";

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchword: "",
      articlesFromGNews: [],
      searchWordsFromDB: [],
      articleTitlesFromMongo: [],
      titlesForTable: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.sendTitleToDB = this.sendTitleToDB.bind(this);
    this.deleteTitle = this.deleteTitle.bind(this);
  }

  componentDidMount() {
    // get articles from gNews, 24h old
    const time = moment().subtract(2, "days").toISOString().split(".")[0] + "Z";
    fetch(
      `https://gnews.io/api/v4/search?q=news&in=content&lang=en&from=${time}&max=9&token=ad067a361343c4bbf32705a9be330165`
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

    fetch(
      `https://gnews.io/api/v4/search?q=${wordForSearching}&in=content&lang=${language}&from=${from}&to=${to}&max=9&token=ad067a361343c4bbf32705a9be330165`
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
    let tempTitlearr = this.state.articleTitlesFromMongo;
    tempTitlearr.push(title);
    this.setState({
      articleTitlesFromMongo: tempTitlearr,
    });

    const articleTitle = {
      article: title,
      count: 1,
      url: url,
    };

    // send title to mongoDB
    axios
      .post("http://localhost:5000/articles/add", articleTitle)
      .then((res) => console.log(res.data));

    console.log(" front-title", title);
  }

  deleteTitle(id) {
    // delete title from mongoDB
    axios
      .delete(`http://localhost:5000/articles/${id}`)
      .then((res) => console.log(res.data));

    console.log(" title id ", id);
    // delete from front
    const arr = this.state.titlesForTable.filter((obj) => obj._id !== id);
    this.setState({
      titlesForTable: arr,
    });
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
    };

    return (
      <BrowserRouter>
        <SearchContext.Provider value={searchContextValue}>
          <Header />
          <Switch>
            <Route path="/" component={Articles} exact={true} />
            <Route path="/titles" component={Titles} />
            <Route component={NotFound} />
          </Switch>
        </SearchContext.Provider>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
