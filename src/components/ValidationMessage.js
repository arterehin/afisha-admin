import React from "react";

import { FormFeedback } from "reactstrap";

const ValidationMessage = ({ text }) => {
  return (
    <>
      {text ? <FormFeedback>{text}</FormFeedback> : ""}
    </>
  );
};

export default ValidationMessage;
