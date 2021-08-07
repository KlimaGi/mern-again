import React from "react";
import { Link } from "react-router-dom";

export default class NoteLink extends React.Component {
  render() {
    return (
      <div>
        <Link to="/note">
          <div className="d-flex justify-content-center align-items-center p-2 btn btn-outline-secondary">
            Note
          </div>
        </Link>
      </div>
    );
  }
}
