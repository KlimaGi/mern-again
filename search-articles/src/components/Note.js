import React from "react";
import { SearchContext } from "../context/searchContext";

export default class Note extends React.Component {
constructor(props){
  super(props);

}

handleNoteChange (event) {

}

  render() {
    return (
      <SearchContext.Consumer>
        {({ titlesForTable }) => (
          <div className="d-flex justify-content-center align-items-center p-2">
           <div>
           <p>{}</p>
           </div> 
          <div className="form-group m-3">
              <textarea
              value={}
              onChange={}
                className="form-control p-3 m-3 note-box"
                aria-label="With textarea"
              ></textarea>
              <button
                onClick={() => sendTitleToDB()}
                className="form-control p-2 mx-3 btn btn-outline-secondary"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </SearchContext.Consumer>
    );
  }
}
