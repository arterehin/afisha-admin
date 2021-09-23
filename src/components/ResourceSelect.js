import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { FormGroup, Label } from "reactstrap";
import ValidationMessage from "./ValidationMessage";

const ResourceSelect = props => {
  const {
    label,
    form,
    name,
    value,
    onChange,
    selector,
    filterFunction = () => true,
    resourceLabelKey = 'name',
    resourceValueKey = '@id',
    isCreatable = false,
    valueIsLabel = false,
    ...otherProps
  } = props;
  const { setValue, values, getError } = form;
  const resource = useSelector(selector);
  const hasError = !!getError(name);
  const styles = {
    control: (styles, state) => (
      {
        ...styles,
        ...hasError ? {
          borderColor: "#e51c23",
          boxShadow: state.isFocused ? "0 0 0 0.2rem rgb(229 28 35 / 25%)" : "",
          "&:hover": {
            hoverBorderColor: "#e51c23"
          }
        } : {}
      }
    )
  };


  const resourceOptions = useMemo(() => {
    return resource.filter(filterFunction).map((entity) => ({
      value: entity[resourceValueKey],
      label: entity[resourceLabelKey]
    }))
  }, [resource, resourceLabelKey, filterFunction]);

  const handleChange = (value) => {
    const parsedValue = Array.isArray(value) ?
      value.map(v => v.value)
      : value.value;

    if (onChange) {
      onChange(parsedValue);
    } else {
      setValue(name, parsedValue)
    }
  }

  const convertValueToOption = (value) => {
    if (!value) {
      return null;
    }

    if(!Array.isArray(value)) {
      value = [value];
    }

    return value.map((v) => {
      const option = resourceOptions.find((option) => (option.value === v));

      return option ?? {
        value: v,
        label: v
      }
    });
  }

  return (
    <FormGroup>
      {label && (
        <Label>{label}</Label>
      )}
      { isCreatable ? (
        <Creatable
          {...otherProps}
          name={name}
          options={resourceOptions}
          value={convertValueToOption(value ?? values[name])}
          onChange={handleChange}
          className="is-invalid"
          styles={styles}
        />
      ) : (
        <Select
          {...otherProps}
          name={name}
          options={resourceOptions}
          value={convertValueToOption(value ?? values[name])}
          onChange={handleChange}
          className="is-invalid"
          styles={styles}
        />
      )}
      <ValidationMessage text={getError(name)} />
    </FormGroup>
  );
}

export { ResourceSelect };
