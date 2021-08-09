import React from "react";
import { ArticleNoteContext } from "../context/articleNoteContext";
import AreaText from "./AreaText";

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaText: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(addNote, id, text) {
    addNote(id, text);
    window.location = "/titles";
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
              <AreaText
                text={articleInfo.note}
                sendToParent={(inputWord) =>
                  this.setState({ areaText: inputWord })
                }
              />
              <button
                onClick={() =>
                  this.handleClick(
                    addNote,
                    articleInfo._id,
                    this.state.areaText
                  )
                }
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
