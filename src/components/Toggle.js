import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import { CustomInput } from "reactstrap";

const Toggle = ({
  name,
  label,
  value,
  onChange
}) => {
  const [id] = useState(`${name}_${Math.random().toString(16).slice(-4)}`);

  const handleOnChange = useCallback((e) => {
    onChange && onChange({
      target: {
        name,
        value: e.target.checked
      }
    })
  }, [name, onChange]);

  return (
    <CustomInput
      id={id}
      type="switch"
      className="mb-2"
      name={name}
      checked={value}
      label={label}
      onChange={handleOnChange}
    />
  );
};

Toggle.propTypes = {
  name: PropTypes.string.isRequired
}

export default Toggle;
