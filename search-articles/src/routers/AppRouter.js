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
      language: "",
      from: "",
      to: "",
      articlesFromGNews: [],
      searchWordsFromDB: [],
    };
  }

  componentDidMount() {
    // get articles from gNews, 24h old
    const time = moment().subtract(2, "days").toISOString().split(".")[0] + "Z";
    fetch(
      `https://gnews.io/api/v4/search?q=news&in=content&lang=en&from=${time}&max=9&token=9f76b7fad62719cde83c324e1de64e63`
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
  }

  handleSearch(searchword, language, from, to) {
    this.setState({ searchword, language, from, to });

    // send search word to mongoDB
    const word = {
      searchword: this.state.searchword,
    };
    axios
      .post("http://localhost:5000/searchwords/add", word)
      .then((response) => console.log(response.data));

    // get gNews articles by searchword
    const searchGN = this.state.searchword || "news";
    const langGN = this.state.language || "en";
    const fromGN = this.state.from;
    const toGN = this.state.to;

    fetch(
      `https://gnews.io/api/v4/search?q=${searchGN}&in=content&lang=${langGN}&from=${fromGN}&to=${toGN}&max=9&token=9f76b7fad62719cde83c324e1de64e63`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({ articlesFromGNews: data.articles });
      });
  }

  render() {
    const searchContextValue = {
      handleSearch: this.handleSearch,
      articlesFromGNews: this.state.articlesFromGNews,
      searchWordsFromDB: this.state.searchWordsFromDB,
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
