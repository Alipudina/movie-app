import React, { Component, Fragment } from "react";

class SearchComponent extends Component {
  state = {};

  //   onChange = () => {
  //     console.log(555555);
  //   };

  render() {
    return (
      <Fragment>
        <div className="input-group">
          <div className="input-group-prepend">
            <span
              className="input-group-text bg-secondary text-white"
              id="inputGroup-sizing-default"
            >
              Search
            </span>
          </div>
          <input
            onChange={(e) => this.props.onSearch(e)}
            type="text"
            className="form-control search bg-secondary text-white"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            autoFocus
            placeholder="search movie"
          />
        </div>
        {this.props.noMovies && (
          <div className="alert alert-danger">No Result!</div>
        )}
      </Fragment>
    );
  }
}

export default SearchComponent;
