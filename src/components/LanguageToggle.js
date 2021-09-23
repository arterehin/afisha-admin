import React, { useState, useEffect } from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
  UncontrolledDropdown
} from "reactstrap";
import useLanguage from "@hooks/useLanguage";

const LanguageToggle = props => {
  const {
    onChange,
    loading = false,
    menuProps = { right: true },
    initialLocale
  } = props;
  const { locales, languages, URLLanguage } = useLanguage();
  const [locale, setLocale] = useState(initialLocale ?? URLLanguage ?? locales[0]);
  const language = languages[locale];
  const handleChange = lng => {
    onChange(lng);
    setLocale(lng);
  }

  useEffect(() => {
    onChange(locale);
  }, []);

  return (
    <div className="language-toggle_container">
      <UncontrolledDropdown nav inNavbar className="mr-2">
        <DropdownToggle nav caret className="nav-flag" disabled={loading}>
          {loading ? (
            <Spinner
              type="grow"
              color="primary"
            />
          ) : (
            <img
              src={language.flag}
              alt={language.label}
            />
          )}
        </DropdownToggle>

        <DropdownMenu {...menuProps}>
          {locales.map((locale) => (
            <DropdownItem key={locale} onClick={() => handleChange(locale)}>
              <img
                src={languages[locale].flag}
                alt={languages[locale].label}
                width="20"
                className="align-middle mr-1"
              />
              <span className="align-middle">{languages[locale].label}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
};

export { LanguageToggle };
