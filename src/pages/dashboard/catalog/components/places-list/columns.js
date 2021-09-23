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
          textAlign: "center",
        };
      },
    },
    {
      dataField: "name",
      text: t("list.table.column.name"),
      sort: false,
    },
  ];
};

export default columns;
