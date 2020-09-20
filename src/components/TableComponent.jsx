import React from "react";
import { Table } from "react-bootstrap";

import { NavLink } from "react-router-dom";

const TableComponent = ({
  movies,
  noMovies,
  disableDeleteButton,
  onUpdate,
  onDelete,
  searchedArray,
}) => {
  if (movies.length === 0 || noMovies) return null;
  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>Movie</th>
          <th>Genre</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => {
          return (
            <tr
              key={movie._id}
              style={{
                background: (() => {
                  for (let i = 0; i < searchedArray.length; i++) {
                    if (movie.name === searchedArray[i].name) {
                      return "lime";
                    }
                  }
                })(),
              }}
            >
              <td>{movie.name}</td>
              <td>{movie.genre}</td>
              <td>{movie.rate}</td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  disabled={disableDeleteButton}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
              <td>
                <NavLink
                  className="btn btn-primary text-white"
                  onClick={() => onUpdate(movie._id)}
                  to="/movies/update/"
                >
                  Update
                </NavLink>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableComponent;
