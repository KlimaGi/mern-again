import React from "react";
import { Link } from "react-router-dom";
import { ArticleNoteContext } from "../context/articleNoteContext";

export default class NoteLink extends React.Component {
  render() {
    return (
      <ArticleNoteContext.Consumer>
        {({ forNote }) => (
          <div>
            <Link to="/note">
              <div
                onClick={() => forNote(this.props.id)}
                className="d-flex justify-content-center align-items-center p-2 btn btn-outline-secondary"
              >
                Note
              </div>
            </Link>
          </div>
        )}
      </ArticleNoteContext.Consumer>
    );
  }
}
