import React from "react";

import RowActions from "@components/RowActions";

export const columns = (actions, t) => {
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
            text: t("district-name"),
        },
        {
            dataField: "slug",
            text: t("slug"),
        },
        {
            dataField: "",
            text: t("actions"),
            formatter: (col, row) => (
                <RowActions {...{
                    col,
                    row,
                    ...actions
                }} />
            )
        }
    ];
};