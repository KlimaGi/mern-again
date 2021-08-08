import React from "react";
import { ArticleNoteContext } from "../context/articleNoteContext";

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaText: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      areaText: event.target.value,
    });
  }

  render() {
    return (
      <ArticleNoteContext.Consumer>
        {({ articleInfo, addNote }) => (
          <div className="d-flex justify-content-center align-items-center p-2">
            <div className="p-3 m-3 note-box">
              <p>{articleInfo.article}</p>
            </div>
            <div className="form-group m-3 container-fluid note-box">
              <textarea
                className="form-control p-3 m-1 "
                aria-label="With textarea"
                placeholder="Your note ..."
                onChange={this.handleChange}
                value={this.state.areaText}
              ></textarea>
              <button
                onClick={() => addNote(articleInfo._id, this.state.areaText)}
                className="form-control p-2 m-1 btn btn-outline-secondary"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </ArticleNoteContext.Consumer>
    );
  }
}
