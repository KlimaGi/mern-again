import React from "react";
import DataTable from "react-data-table-component";
//import DataTableExtension from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { SearchContext } from "../context/searchContext";

const ArticleLink = (row) => <a href="{row}">Read it</a>;

const columns = [
  {
    name: "Title",
    selector: "article",
    sortable: true,
  },
  {
    name: "Number of visits",
    selector: "count",
    sortable: true,
  },
  {
    name: "Link",
    selector: "url",
    cell: (row) => <ArticleLink {...row} />,
  },
];

export default class Titles extends React.Component {
  render() {
    return (
      <SearchContext.Consumer>
        {({ titlesForTable }) => (
          <div className="title-table container-fluid">
            <div className="card">
              <DataTable
                title="Visited articles titles"
                columns={columns}
                data={titlesForTable}
                defaultSortField="article"
                pagination
              />
            </div>
          </div>
        )}
      </SearchContext.Consumer>
    );
  }
}
