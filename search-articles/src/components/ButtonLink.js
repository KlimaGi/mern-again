import React from "react";
import axios from "axios";

export default class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };

    this.writeToDB = this.writeToDB.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return { title: props.title };
  }

  writeToDB = () => {
    const articleTitle = {
      title: this.state.title,
    };

    // send search word to mongoDB
    axios
      .post("http://localhost:5000/articles/add", articleTitle)
      .then((res) => console.log(res.data));

    window.setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  render() {
    return (
      <div>
        <a
          href={this.props.linkTo}
          target="_blank"
          onClick={this.writeToDB}
          className="link-style"
        >
          <div className="d-flex justify-content-center align-items-center p-2 buton-style">
            Read Article
          </div>
        </a>
      </div>
    );
  }
}
