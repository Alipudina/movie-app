import React from "react";
import { Form } from "react-bootstrap";

const InputComponent = ({
  name,
  label,
  value,
  error,
  inputFocus,
  onChange,
}) => {
  return (
    <Form.Group controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        value={value}
        autoFocus={inputFocus}
        onChange={onChange}
        type="text"
        name={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
};

export default InputComponent;
