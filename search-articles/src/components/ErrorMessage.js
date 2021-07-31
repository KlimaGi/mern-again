import React from "react";

export default class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.location.reload();
  }

  render() {
    return (
      <div className="search-error-msg d-flex justify-content-center align-items-center m-5">
        <p className="text-center m-5">
          Woops! Something went wrong... Or there is no results for your search
          word.
        </p>
        <button
          onClick={this.handleClick}
          className="m-5 text-color btn btn-outline-light button-style "
        >
          Try again
        </button>
      </div>
    );
  }
}
