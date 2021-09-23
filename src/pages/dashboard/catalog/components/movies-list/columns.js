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
      dataField: "title",
      text: t("list.table.column.title"),
      sort: false,
    },
  ];
};

export default columns;
