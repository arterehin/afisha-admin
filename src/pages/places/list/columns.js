import React from "react";

import RowActions from "@components/RowActions";

const columns = (actions, t) => {
  return [
    {
      text: "#",
      dataField: "index",
      formatter: (cell, row) => {
        return row.index + 1;
      },
      align: "center",
      headerStyle: () => {
        return {
          width: "5%",
          textAlign: "center"
        }
      }
    },
    {
      dataField: "name",
      text: t("name"),
      sort: true
    },
    {
      dataField: "slug",
      text: t("slug"),
      sort: true
    },
    {
      dataField: "",
      text: t("actions"),
      sort: false,
      formatter: (col, row) => (
        <RowActions {...{
          col,
          row,
          ...actions
        }} />
      )
    }
  ]
};

export default columns;