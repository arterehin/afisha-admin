import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizePath } from "@app/i18next/utils";

import { Button } from "reactstrap";

const Page404 = () => {
  const { i18n } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="display-1 font-weight-bold">404</h1>
      <p className="h1">Page not found.</p>
      <p className="h2 font-weight-normal mt-3 mb-4">
        The page you are looking for might have been removed.
      </p>
      <Link to={localizePath("/dashboard", i18n.language)}>
        <Button color="primary" size="lg">
          Return to website
        </Button>
      </Link>
    </div>
  );
};

export default Page404;
