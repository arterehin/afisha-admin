import React, { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import { FormGroup, Label, Input } from "reactstrap";
import Dropdown from "@components/Dropdown";
import Toggle from "@components/Toggle";
import Message from "@components/ValidationMessage";

const ConfigurableField = ({
  field: fieldProps,
  form,
  locale
}) => {
  const { t, i18n } = useTranslation();
  const { getError, values, handleChange, handleBlur, registerRule } = form;
  const { inputType, slug, translations, choices, isRequired, isTranslatable } = fieldProps;
  const hint = translations[i18n.language].hint;
  const label = translations[i18n.language].name;

  const options = useMemo(() => {
    return Object.keys(choices).map((item) => {
      return {
        label: choices[item][i18n.language],
        value: item
      }
    });
  }, [choices, i18n.language]);

  const name = useMemo(() => {
    if(locale && slug) {
      return isTranslatable ? `attributes.translations.${locale}.${slug}` : `attributes.${slug}`;
    }
  }, [isTranslatable, slug, locale]);

  const value = useMemo(() => {
    if(locale && slug) {
      return isTranslatable ? _.get(values, `attributes.translations.${locale}.${slug}`) : _.get(values, `attributes.${slug}`);
    }
  }, [isTranslatable, values, slug, locale]);

  useEffect(() => {
    if (isRequired) {
      registerRule({
        [name]: (value) => {
          if (!value) {
            return t("form.required");
          }
        }
      });
    }
  }, [isRequired, registerRule, name, t]);

  const getInpit = () => {
    const baseProps = {
      name,
      placeholder: label,
      onChange: handleChange,
      onBlur: handleBlur,
      value: value || "",
      invalid: !!getError(name)
    }

    switch (inputType) {
      case "SELECT_MULTIPLE": {
        return (
          <Dropdown
            {...baseProps}
            options={options}
            isMulti
          />
        );
      }
      case "SELECT_SINGLE": {
        return (
          <Dropdown
            {...baseProps}
            options={options}
          />
        );
      }
      case "TEXT": {
        return (
          <Input
            {...baseProps}
            type="text"
          />
        );
      }
      case "TEXTAREA": {
        return (
          <Input
            {...baseProps}
            type="textarea"
            rows="5"
          />
        );
      }
      case "BOOLEAN": {
        return (
          <Toggle
            {...baseProps}
            label={label}
          />
        );
      }
      default: {
        return (
          <p>Тип поля {inputType} не реализован.</p>
        );
      }
    }
  }

  return (
    <FormGroup>
      {inputType !== "BOOLEAN" && (<Label>{label}</Label>)}
      {getInpit()}
      <Message text={getError(name)} />
      {hint && <span className="text-muted">{hint}</span>}
    </FormGroup>
  );
};

export default ConfigurableField;
