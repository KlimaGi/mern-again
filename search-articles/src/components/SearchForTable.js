import React from "react";

class SearchForTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  // componentDidMount() {
  //   this.setState({ data: this.props.forSort });
  //   //this.props.filteredData(this.state.data);
  //   console.log("this.props.forSort ", this.props.forSort);
  // }
  handleChange(event) {
    const word = event.target.value.toLowerCase().trim();
    let filtered = this.props.forSort.filter(
      (obj) => obj.article.toLowerCase().indexOf(word) !== -1
    );
    this.setState({ filtered: filtered });
    console.log("filtered ", filtered);
    this.props.filteredData(filtered);
  }

  render() {
    return (
      <div className="d-flex align-items-end justify-content-end">
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
