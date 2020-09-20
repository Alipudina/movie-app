import React, { Component } from "react";
import Joi from "joi-browser";
import { Button } from "react-bootstrap";
import InputComponent from "./InputComponent";
// import { NavLink } from "react-router-dom";

class FormComponent extends Component {
  state = {
    data: {},
    errors: {},
  };

  // navlink
  //   <NavLink
  //   onClick={(e) => (this.validate() ? e.preventDefault() : null)}
  //   to="/movies"
  //   className="text-white"
  //   type="submit"
  // > </NavLink>
  //

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    const urlPath = this.props.location.pathname;

    if (urlPath === "/movies/add") {
      this.props.doSubmitAddMovieForm(this.state.data);
    }

    if (urlPath === "/movies/update/") {
      this.props.doSubmitUpdateMovieForm(this.state.data);
    }
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };

    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <Button disabled={this.validate()} variant="primary" type="submit">
        {label}
      </Button>
    );
  };

  renderInput = (name, label, inputFocus = false) => {
    const { data, errors } = this.state;
    return (
      <InputComponent
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        inputFocus={inputFocus}
      />
    );
  };
}

export default FormComponent;
