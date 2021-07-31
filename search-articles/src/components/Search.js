import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredSearchWordsFromDB: [],
      searchWordsFromDB: props.searchWordsFromDB,
      showResultsUl: false,
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectWord = this.selectWord.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus = () => {
    this.props.onSendWord("");
  };

  handleChange(event) {
    this.props.onSendWord(event.target.value);

    const word = event.target.value;

    if (word === "") {
      this.setState({ error: false, showResultsUl: false });
    } else if (
      word.length >= 1 &&
      word.length <= 40 &&
      word.match(/^[a-zA-Z0-9 ]*$/gi)
    ) {
      const filteredSearchWordsFromDB = this.state.searchWordsFromDB.filter(
        (wordFromDB) => {
          if (wordFromDB.indexOf(word.toLowerCase()) !== -1) {
            return wordFromDB;
          }
        }
      );
      this.setState({
        filteredSearchWordsFromDB: filteredSearchWordsFromDB,
        error: false,
        showResultsUl: true,
      });
    } else {
      this.setState({
        showResultsUl: false,
        error: true,
      });
    }
  }

  selectWord(word) {
    this.props.onSendWord(word);
  }

  handleBlur = () => {
    this.setState({ showResultsUl: false });
  };

  render() {
    return (
      <div className="" onClick={this.handleBlur}>
        <div className="error-box error">
          {this.state.error && (
            <p className="error text-danger pb-1 m-0">
              Oops... please enter valid word
            </p>
          )}
        </div>

        <input
          type="text"
          className="form-control input-back text-color"
          value={this.props.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder="Enter search word"
        />

        {this.state.showResultsUl && (
          <ul className="search-list-box px-3">
            {this.state.filteredSearchWordsFromDB.map((word, index) => (
              <WordsList
                searchWord={word}
                onClickWord={this.selectWord}
                indexKey={index}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

function WordsList(props) {
  return (
    <li
      key={props.indexKey}
      className="li-item py-2"
      onClick={() => {
        props.onClickWord(props.searchWord);
      }}
    >
      {props.searchWord}
    </li>
  );
}

export default Search;
