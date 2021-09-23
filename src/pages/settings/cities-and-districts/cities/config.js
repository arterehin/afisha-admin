import React from "react";

import { 
    MinusCircle, 
    PlusCircle 
} from "react-feather";
import RowActions from "@components/RowActions";
import Districts from "@pages/settings/cities-and-districts/districts";

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
            text: t("city-name"),
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

export const expandRow = (props) => {
    return {
        showExpandColumn: true,
        renderer: (row) => (
            <Districts {...{
                ...row,
                ...props
            }} />
        ),
        expandHeaderColumnRenderer: ({ isAnyExpands }) =>
            isAnyExpands ? (
                <MinusCircle width={16} height={16} />
            ) : (
                <PlusCircle width={16} height={16} />
            ),
        expandColumnRenderer: ({ expanded }) =>
            expanded ? (
                <MinusCircle width={16} height={16} />
            ) : (
                <PlusCircle width={16} height={16} />
            )
    };
};