import React from 'react';
import { LanguageToggle } from "@components/LanguageToggle";
import { useHistory } from "react-router-dom";

const LanguageURLToggle = () => {
  const history = useHistory();

  const changeLanguage = async (lng) => {
    const { pathname, search } = window.location;
    const parts = pathname.replace("/adm", "").split("/");

    parts[1] = lng;
    history.replace(`${parts.join("/")}${search}`);
  };

  return (
    <LanguageToggle
      onChange={changeLanguage}
    />
  )
};

export { LanguageURLToggle };
