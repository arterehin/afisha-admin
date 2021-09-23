import React, { 
  Children,
  isValidElement,
  cloneElement 
} from "react";

const CustomCheckbox = ({ id, label, children }) => {

  const childrenWithProps = Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, { 
        id,
        className: "custom-control-input"
      });
    }
    return child;
  });

  return (
    <div className="mb-2 custom-checkbox custom-control">
      {childrenWithProps}
      <label
        htmlFor={id}
        className="custom-control-label"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
