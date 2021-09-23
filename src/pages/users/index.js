import React from "react";
import tabs from "./tabs";

import Page from "@components/Page";

const Users = () => (
  <Page
    tabs={tabs}
    namespace="users"
  />
);

export default Users;