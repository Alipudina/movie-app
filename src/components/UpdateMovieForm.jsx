import React from "react";
import Joi from "joi-browser";
import { Form, Jumbotron, Row, Col } from "react-bootstrap";
import FormComponent from "./common/FormComponent";
import { Redirect } from "react-router-dom";

class UpdateMovieForm extends FormComponent {
  state = {
    data: {
      name: "",
      genre: "",
      rate: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).required().label("Movie Name"),
    genre: Joi.string().min(3).required().label("Genre"),
    rate: Joi.number().min(1).max(10).required().label("Rate"),
  };

  componentDidMount() {
    const movieToUpdate = this.props.movieToUpdate;

    const updateData = {
      name: movieToUpdate[0].name,
      genre: movieToUpdate[0].genre,
      rate: movieToUpdate[0].rate,
    };

    this.setState({ data: updateData });
  }

  render() {
    const movieToUpdate = this.props.movieToUpdate;
    if (!movieToUpdate) return null;

    return (
      <Jumbotron>
        <Row>
          <Col className="text-center pb-3 text-uppercase h3">update movie</Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Movie Name", 2)}

          {this.renderInput("genre", "Genre", null)}

          {this.renderInput("rate", "Rate", null)}

          {this.renderButton("Update")}
        </Form>

        {this.props.redirectToMovies && <Redirect to="/movies" />}
      </Jumbotron>
    );
  }
}

export default UpdateMovieForm;
