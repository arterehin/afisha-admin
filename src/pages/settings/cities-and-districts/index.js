import React from "react";
import tabs from "./tabs";

import Page from "@components/Page";

const CitiesAndDistricts = () => (
  <Page
    tabs={tabs}
    namespace="settings.cities-and-districts"
  />
);

export default CitiesAndDistricts;