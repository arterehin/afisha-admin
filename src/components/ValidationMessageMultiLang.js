import React from "react";
import { useTranslation } from "react-i18next";

import { FormFeedback } from "reactstrap";

const ValidationMessageMultiLang = ({ errorCode }) => {
  const { t } = useTranslation('common');

  return (
    <>
      {errorCode ? <FormFeedback>{t(errorCode)}</FormFeedback> : ""}
    </>
  );
};

export { ValidationMessageMultiLang };
