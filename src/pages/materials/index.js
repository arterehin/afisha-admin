import React from "react";
import tabs from "./tabs";

import Page from "@components/Page";
import { LanguageURLToggle } from "@components/LanguageURLToggle";

const Materials = () => (
  <Page
    tabs={tabs}
    namespace="materials"
    titleContent={<LanguageURLToggle/>}
  />
);

export default Materials;