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
            dataField: "username",
            text: t("list.username"),
            sort: true
        },
        {
            dataField: "fullName",
            text: t("fullname"),
            sort: true
        },
        {
            dataField: "email",
            text: t("email"),
            sort: true
        },
        {
            dataField: "",
            text: t("list.actions"),
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