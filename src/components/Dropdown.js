import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import Async from "react-select/async";

const Dropdown = ({
  name,
  labelKey = "",
  valueKey = "",
  toString = true,
  options,
  isMulti,
  value,
  invalid,
  onChange,
  onBlur,
  disabled,
  ...props
}) => {
  const { loadOptions } = props;
  const Component = loadOptions ? Async : Select;

  const selectProps = useCallback(() => {
    return {
      ...(labelKey ? { getOptionLabel: option => option[labelKey] } : {}),
      ...(valueKey ? { getOptionValue: option => option[valueKey] } : {})
    }
  }, [labelKey, valueKey]);

  const fieldValue = useMemo(() => {
    const key = valueKey || "value";
    const isString = toString === "string" && typeof value === "string";

    if (value) {
      if (isMulti) {
        const values = isString ? value.split(",") : value;
        return options.filter(item => values.indexOf(item[key]) !== -1);
      } else {
        return options.filter(item => item[key] === value);
      }
    }
  }, [isMulti, options, toString, value, valueKey]);

  const handleChange = useCallback((value) => {
    let result = value;
    const key = valueKey || "value";

    if (isMulti) {
      const data = value && value.map(item => item[key]);

      if (Array.isArray(data) && data.length > 0) {
        result = toString ? data.join(",") : data;
      } else {
        result = "";
      }
    } else {
      result = value ? value[key] : "";
    }

    onChange && onChange({
      target: {
        name,
        value: result
      }
    });
  }, [valueKey, isMulti, toString, name, onChange]);

  const handleBlur = useCallback(() => {
    onBlur && onBlur({
      target: {
        name,
        value: ""
      }
    });
  }, [name, onBlur]);

  return (
    <Component
      {...props}
      {...selectProps()}
      value={fieldValue}
      options={options}
      classNamePrefix="dropdown"
      className={invalid ? "is-invalid" : ""}
      isMulti={isMulti}
      onChange={handleChange}
      onBlur={handleBlur}
      isDisabled={disabled}
    />
  );
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
}

export default React.memo(Dropdown, (prevProps, nextProps) => {
  const {
    options: prevOpt,
    value: prevValue,
    invalid: prevInvalid,
    disabled: prevDisabled
  } = prevProps;

  const {
    options: nextOpt,
    value: nextValue,
    invalid: nextInvalid,
    disabled: nextDisabled
  } = nextProps;

  return prevOpt === nextOpt
    && prevValue === nextValue
    && prevInvalid === nextInvalid
    && prevDisabled === nextDisabled;
});
