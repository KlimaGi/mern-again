import React from "react";

class SearchRadioBtns extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  handleChangeValue(event) {
    console.log("radio btns", event.target.value);
    this.props.getWord(event.target.value);
  }

  render() {
    return (
      <div className="mx-5" onClick={this.handleChangeValue}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="article"
            id="title1"
            name="searchRadio"
          />
          <label className="form-check-label" for="title1">
            Search in titles
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="note"
            id="note2"
            name="searchRadio"
          />
          <label className="form-check-label" for="note2">
            Search in notes
          </label>
        </div>
      </div>
    );
  }
}

export default SearchRadioBtns;
