import React from 'react';
import { FormGroup, Input as StrapInput, Label } from "reactstrap";
import ValidationMessage from "./ValidationMessage";

const Input = props => {
  const { form, name, label, ...otherProps } = props;
  const { getError, handleChange, values } = form;

  return (
    <FormGroup>
      {label && (
        <Label>{label}</Label>
      )}
      <StrapInput
        type="text"
        name={name}
        value={values[name]}
        onChange={handleChange}
        invalid={!!getError(name)}
        {...otherProps}
      />
      <ValidationMessage text={getError(name)} />
    </FormGroup>
  )
};

export { Input };
