import React from "react";
import DataTable from "react-data-table-component";
//import DataTableExtension from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { SearchContext } from "../context/searchContext";
import DeleteButton from "./DeleteButton";
import NoteLink from "./NoteLink";
import SearchForTable from "./SearchForTable";

const columns = [
  {
    name: "Title",
    selector: "article",
    sortable: true,
    wrap: true,
    grow: 3,
  },
  {
    name: "Visits",
    selector: "count",
    sortable: true,
  },
  {
    name: "Notes",
    selector: "note",
    sortable: true,
    wrap: true,
    grow: 3,
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
  header: {
    style: {
      paddingLeft: "3rem",
    },
  },
  rows: {
    style: {
      minHeight: "72px",
      paddingLeft: "2rem",
    },
  },
  headCells: {
    style: {
      paddingLeft: "3rem",
      paddingRight: "6px",
      fontSize: "1rem",
    },
  },
  cells: {
    style: {
      paddingLeft: "1rem",
      paddingRight: "6px",
      fontSize: "1rem",
    },
  },
};

export default class Titles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForTable: [],
    };
  }

  render() {
    return (
      <SearchContext.Consumer>
        {({ titlesForTable }) => (
          <div className="title-table container-fluid g-0 .parent-box">
            <div className="search-box-in-table">
              <SearchForTable
                forSort={titlesForTable}
                filteredData={(data) => this.setState({ dataForTable: data })}
              />
            </div>
            <div className="card p-3">
              {this.state.dataForTable.length === 0 ? (
                <DataTable
                  title="Visited articles titles"
                  columns={columns}
                  data={titlesForTable}
                  defaultSortField="article"
                  pagination
                  customStyles={customStyles}
                />
              ) : (
                <DataTable
                  title="Visited articles titles"
                  columns={columns}
                  data={this.state.dataForTable}
                  defaultSortField="article"
                  pagination
                  customStyles={customStyles}
                />
              )}
            </div>
          </div>
        )}
      </SearchContext.Consumer>
    );
  }
}
