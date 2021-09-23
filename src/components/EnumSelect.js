import React, { useMemo } from "react";
import { FormGroup, Label } from "reactstrap";
import Dropdown from "@components/Dropdown";
import ValidationMessage from "./ValidationMessage";

const EnumSelect = props => {
  const {
    t,
    label,
    form,
    name,
    onChange,
    options,
    optionTranslation,
    ...otherProps
  } = props;
  const { handleChange, values, getError } = form;

  const enumOptions = useMemo(() => options.map(entity => ({
    value: entity,
    label: t(optionTranslation[entity])
  })), [t]);

  return (
    <FormGroup>
      {label && (
        <Label>{label}</Label>
      )}
      <Dropdown
        {...otherProps}
        labelKey="label"
        valueKey="value"
        name={name}
        options={enumOptions}
        value={values[name]}
        onChange={handleChange}
      />
      <ValidationMessage text={getError(name)} />
    </FormGroup>
  );
};

export { EnumSelect };
