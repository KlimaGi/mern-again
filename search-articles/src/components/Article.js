import React from "react";
import ButtonLink from "./ButtonLink";
import "font-awesome/css/font-awesome.min.css";
import { SearchContext } from "../context/searchContext";

const Article = (props) => (
  <SearchContext.Consumer>
    {({ sendTitleToDB }) => (
      <div>
        <div className="article-box m-4">
          <img src={props.image} className="img-style" alt="" />

          {props.visited && (
            <div className="visited rounded-circle text-center p-1">
              <i className="fa fa-eye"></i>
            </div>
          )}

          <div className="m-3">
            <h5 className="">{props.title}</h5>

            <p className="d-inline-block text-truncate for-truncate-width">
              {props.description}
            </p>
          </div>
          <div
            className="bottom container-fluid rounded-0 back-color-style"
            onClick={() => sendTitleToDB(props.title, props.url)}
          >
            <ButtonLink linkTo={props.url} />
          </div>
        </div>
      </div>
    )}
  </SearchContext.Consumer>
);

export default Article;
