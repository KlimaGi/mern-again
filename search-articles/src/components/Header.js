import React from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Search from "./Search";
import Language from "./Language";
import Time from "./Time";
import { SearchContext } from "../context/searchContext";
import moment from "moment";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: "",
      language: "en",
      from: moment().subtract(2, "days")._d.toISOString().split(".")[0] + "Z",
      to: moment()._d.toISOString().split(".")[0] + "Z",
    };
  }

  render() {
    return (
      <SearchContext.Consumer>
        {({ handleSearch, searchWordsFromDB }) => (
          <div className="container-fluid g-0 bg-secondary">
            <div className="d-flex align-items-end flex-wrap justify-content-start  back-color-style px-5 bt-3 pb-4">
              <div className="mx-5 ">
                <h2 className=" m-0">
                  <Link className="link-logo-name text-white" to="/">
                    Articles from GNews
                  </Link>
                </h2>
              </div>
              <div className="mx-5 my-1">
                <Link
                  className="text-white m-0 px-2 py-1 link-style"
                  to="/titles"
                >
                  Titles
                </Link>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(
                    this.state.searchWord,
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
                        this.setState({ searchWord: inputWord })
                      }
                      value={this.state.searchWord}
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
