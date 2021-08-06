import React from "react";
import { SearchContext } from "../context/searchContext";

export default class ButtonForTable extends React.Component {
  render() {
    return (
      <SearchContext.Consumer>
        {({ deleteTitle }) => (
          <div
            className="d-flex justify-content-center align-items-center p-2 btn btn-outline-danger"
            onClick={() => deleteTitle(this.props.id)}
          >
            Delete
          </div>
        )}
      </SearchContext.Consumer>
    );
  }
}
