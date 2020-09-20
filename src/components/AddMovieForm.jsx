import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { Form, Jumbotron, Row, Col } from "react-bootstrap";
import FormComponent from "./common/FormComponent";

class AddMovieForm extends FormComponent {
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

  render() {
    return (
      <Jumbotron>
        <Row>
          <Col className="text-center pb-3 text-uppercase h3">new movie</Col>
        </Row>

        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Movie Name", 2)}

          {this.renderInput("genre", "Genre")}

          {this.renderInput("rate", "Rate")}

          {this.renderButton("Add Movie")}
        </Form>
        {this.props.redirectToMovies && <Redirect to="/movies" />}
      </Jumbotron>
    );
  }
}

export default AddMovieForm;
