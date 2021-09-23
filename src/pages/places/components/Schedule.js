import React from "react";

import TabHeader from "@components/TabHeader";
import BusinessHours from "@components/BusinessHours";

const Schedule = ({
  value = {},
  name,
  onChange,
  ...props
}) => {
  const handleHoursChange = (value) => {
    onChange && onChange({
      target: {
        name,
        value
      }
    })
  }

  return (
    <>
      <TabHeader
        title="График работы"
      />
      <BusinessHours
        {...props}
        state={value}
        field={name}
        onChange={handleHoursChange}
      />
    </>
  );
};

export default Schedule;