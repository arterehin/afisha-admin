import React from "react";
import { useTranslation } from "react-i18next";

import { Button, Spinner } from "reactstrap";
import { X } from "react-feather";

const FormFooter = ({
  processing = false,
  onDiscard,
  onSave
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        color="primary"
        className="mr-1"
        disabled={processing}
        onClick={onSave}
      >
        {processing && (
          <Spinner
            type="grow"
            size="sm"
            className="mr-2"
          />
        )}
        {t("form.save-btn")}
      </Button>
      <Button
        color="secondary"
        disabled={processing}
        onClick={onDiscard}
      >
        <X className="align-middle mr-1" size={18} />
        {t("form.cancel-btn")}
      </Button>
    </>
  );
};

export default FormFooter;