import React from "react";
import tabs from "./tabs";

import Page from "@components/Page";

const Catalog = () => (
  <Page
    tabs={tabs}
    namespace="places"
  />
);

export default Catalog;