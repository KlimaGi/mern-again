import React from "react";

export default class Button extends React.Component {
  render() {
    return (
      <div>
        <a href={this.props.linkTo} target="_blank" className="link-style">
          <div className="d-flex justify-content-center align-items-center p-2 buton-style">
            Read Article
          </div>
        </a>
      </div>
    );
  }
}
