import React from "react";
import DataTable from "react-data-table-component";
//import DataTableExtension from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { SearchContext } from "../context/searchContext";
import DeleteButton from "./DeleteButton";
import NoteLink from "./NoteLink";

const columns = [
  {
    name: "Title",
    selector: "article",
    sortable: true,
    wrap: true,
    grow: 3,
  },
  {
    name: "Number of visits",
    selector: "count",
    sortable: true,
  },
  {
    name: "Notes",
    selector: "note",
    sortable: true,
    wrap: true,
  },
  {
    name: "Link",
    selector: "url",
    cell: (row) => (
      <a className="btn btn-outline-secondary" href={row.url} target="_blank">
        Read it
      </a>
    ),
  },
  {
    name: "Note",
    cell: (row) => <NoteLink id={row._id} />,
  },
  {
    name: "Delete",
    cell: (row) => <DeleteButton id={row._id} />,
  },
];

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "6px", // override the cell padding for head cells
      paddingRight: "6px",
    },
  },
  cells: {
    style: {
      paddingLeft: "6px", // override the cell padding for data cells
      paddingRight: "6px",
    },
  },
};

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
                customStyles={customStyles}
              />
            </div>
          </div>
        )}
      </SearchContext.Consumer>
    );
  }
}
