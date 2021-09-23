import React from "react";
import { useTranslation } from "react-i18next";

import { FormGroup, Label, Input } from "reactstrap";

const contactsTypes = [
  "phone",
  "telegram",
  "website",
  "email",
  "fax",
  "skype"
]

const Contacts = (props) => {
  const { t } = useTranslation("places");
  const { form, formId, locale, processing } = props;
  const { getValue, handleChange, handleBlur } = form;

  return (
    <>
      {contactsTypes.map((type, index) => (
        <FormGroup key={`${index}${type}`}>
          <Label>{t(type)}</Label>
          <Input
            id={`${type}_${locale}_${formId}`}
            name={`contacts.${type}`}
            type="text"
            placeholder={t(type)}
            value={getValue(`contacts.${type}`)}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={processing}
          />
        </FormGroup>
      ))}
    </>
  );
}

export default Contacts;
