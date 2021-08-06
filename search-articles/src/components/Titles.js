import React from "react";
import DataTable from "react-data-table-component";
//import DataTableExtension from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { SearchContext } from "../context/searchContext";
import ButtonForTable from "./ButtonForTable";

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
    cell: (row) => (
      <a href={row.url} target="_blank">
        Read it
      </a>
    ),
  },
  {
    name: "Delete",
    cell: (row) => <ButtonForTable id={row._id} />,
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
