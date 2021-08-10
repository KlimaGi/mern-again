import React from "react";
import SearchRadioBtns from "./SearchRadioBtns";

class SearchForTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      filterWord: "article",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const word = event.target.value.toLowerCase().trim();
    let filtered = [];
    if (this.state.filterWord === "note") {
      filtered = this.props.forSort.filter(
        (obj) => obj.note.toLowerCase().indexOf(word) !== -1
      );
    } else {
      filtered = this.props.forSort.filter(
        (obj) => obj.article.toLowerCase().indexOf(word) !== -1
      );
    }

    this.setState({ filtered: filtered });
    console.log("filtered ", filtered);
    this.props.filteredData(filtered);
  }

  render() {
    return (
      <div className="d-flex align-items-end justify-content-end">
        <SearchRadioBtns
          getWord={(word) => this.setState({ filterWord: word })}
        />
        <div>
          <input
            type="text"
            className="form-control input-back text-color"
            onChange={this.handleChange}
          />
        </div>
        <div className="mx-1"></div>
      </div>
    );
  }
}

export default SearchForTable;
