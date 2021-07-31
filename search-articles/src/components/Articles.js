import React from "react";
import Article from "./Article";
// import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { SearchContext } from "../context/searchContext";

export default class Articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
    };

    this.articleList = this.articleList.bind(this);
  }

  checkVisited(title, list) {
    return list.includes(title) ? true : false;
  }

  articleList = (prop, list) => {
    if (prop.length > 0) {
      return prop.map((details, index) => {
        return (
          <Article
            title={details.title}
            image={details.image}
            description={details.description}
            url={details.url}
            key={index}
            visited={this.checkVisited(details.title, list)}
          />
        );
      });
    } else {
      return <ErrorMessage />;
    }
  };

  render() {
    return (
      <SearchContext.Consumer>
        {({ articlesFromGNews, articleTitlesFromMongo }) => (
          <div className="d-flex flex-wrap justify-content-evenly my-3">
            {this.articleList(articlesFromGNews, articleTitlesFromMongo)}
          </div>
        )}
      </SearchContext.Consumer>
    );
  }
}
