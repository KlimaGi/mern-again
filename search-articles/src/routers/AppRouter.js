import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Articles from "../components/Articles";
import Titles from "../components/Titles";
import Words from "../components/Words";
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
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // get articles from gNews, 24h old
    const time = moment().subtract(2, "days").toISOString().split(".")[0] + "Z";
    fetch(
      `https://gnews.io/api/v4/search?q=news&in=content&lang=en&from=${time}&max=9&token=8dbeb974cde3adbf5fbdb91d32ed9f61`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
      });

    // get from mongoDB searchwords arr
    axios
      .get("http://localhost:5000/searchwords")
      .then((response) => {
        const tempArr = [];
        response.data.map((object) => tempArr.push(object.searchword));
        this.setState({ searchWordsFromDB: tempArr });
      })
      .catch((err) => {
        console.log(err);
      });

    // get titles from mongoDB
    axios.get("http://localhost:5000/articles").then((response) => {
      if (response.data.length > 0) {
        const arrTitles = [];
        response.data.map((object) => arrTitles.push(object.title));
        this.setState({ articleTitlesFromMongo: arrTitles });
      }
    });
  }

  handleSearch(searchword, language, from, to) {
    this.setState({
      searchword: searchword,
    });

    // send search word to mongoDB
    const word = {
      searchword: this.state.searchword,
    };
    axios
      .post("http://localhost:5000/searchwords/add", word)
      .then((response) => console.log(response.data));

    // get gNews articles by searchword

    let wordForSearching = searchword === "" ? "dog" : searchword;

    fetch(
      `https://gnews.io/api/v4/search?q=${wordForSearching}&in=content&lang=${language}&from=${from}&to=${to}&max=9&token=8dbeb974cde3adbf5fbdb91d32ed9f61`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
        console.log(this.state.articlesFromGNews);
      });
    console.log(this.state.articlesFromGNews);
  }

  render() {
    const searchContextValue = {
      handleSearch: this.handleSearch,
      articlesFromGNews: this.state.articlesFromGNews,
      searchWordsFromDB: this.state.searchWordsFromDB,
      articleTitlesFromMongo: this.state.articleTitlesFromMongo,
    };

    return (
      <BrowserRouter>
        <SearchContext.Provider value={searchContextValue}>
          <Header />
          <Switch>
            <Route path="/" component={Articles} exact={true} />
            <Route path="/titles" component={Titles} />
            <Route path="/words" component={Words} />
            <Route component={NotFound} />
          </Switch>
        </SearchContext.Provider>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
