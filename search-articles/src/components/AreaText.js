import React from "react";

export default class AreaText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaText: props.text,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ areaText: e.target.value });
    this.props.sendToParent(e.target.value);
  }

  render() {
    return (
      <div>
        <textarea
          className="form-control p-3 m-1 "
          aria-label="With textarea"
          placeholder="Your note ..."
          value={this.state.areaText}
          onChange={this.handleChange}
        ></textarea>
      </div>
    );
  }
}
