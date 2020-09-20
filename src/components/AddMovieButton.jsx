import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

class AddMovieButton extends Component {
  state = {};
  render() {
    return (
      <Container className="text-center my-5">
        <Link
          onClick={this.props.handleAddMovieButton}
          to="/movies/add"
          className="p-3 px-4 btn btn-success"
        >
          Add Movie
        </Link>
      </Container>
    );
  }
}

export default AddMovieButton;
