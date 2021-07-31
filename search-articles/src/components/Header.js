import React from "react";
//import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
//import ArticlesList from "./ArticlesList";
import Search from "./Search";
import Language from "./Language";
import Time from "./Time";
import { SearchContext } from "../context/searchContext";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchword: "",
      language: "",
      from: "",
      to: "",
    };
  }

  render() {
    return (
      <SearchContext.Consumer>
        {({ handleSearch, searchWordsFromDB }) => (
          <div className="container-fluid g-0 bg-secondary">
            <div className="d-flex align-items-end flex-wrap justify-content-start  back-color-style px-5 bt-3 pb-4">
              <div className="mx-5 ">
                <h2 className="text-white m-0">Articles from GNews</h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(
                    this.state.searchword,
                    this.state.language,
                    this.state.from,
                    this.state.to
                  );
                }}
              >
                <div className="d-flex align-items-end flex-wrap justify-content-center">
                  <div className="m-1 ">
                    <Search
                      onSendWord={(inputWord) =>
                        this.setState({ searchword: inputWord })
                      }
                      value={this.state.searchword}
                      searchWordsFromDB={searchWordsFromDB}
                    />
                  </div>
                  <div className="m-1">
                    <Language
                      onClickLanguage={(lang) => {
                        this.setState({ language: lang });
                      }}
                    />
                  </div>

                  <div className="px-2 m-1">
                    <Time
                      onSetTime={(from, to) => {
                        this.setState({ from, to });
                      }}
                    />
                  </div>
                  <div className="m-1">
                    <button
                      type="submit"
                      className="btn btn-outline-light d-inline button-style"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </SearchContext.Consumer>
    );
  }
}
