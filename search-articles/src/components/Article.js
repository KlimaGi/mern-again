import React from "react";
import ButtonLink from "./ButtonLink";
import "font-awesome/css/font-awesome.min.css";

const Article = (props) => (
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
      <div className="bottom container-fluid rounded-0 back-color-style">
        <ButtonLink title={props.title} linkTo={props.url} />
      </div>
    </div>
  </div>
);

export default Article;
