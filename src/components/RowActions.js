import React from "react";

import { Edit, Trash } from "react-feather";
import { Button } from "reactstrap";

const RowActions = ({ row, onDeleteClick, onEditClick }) => (
    <>
        <Button
            color="primary"
            className="mr-1 mb-1"
            onClick={(e) => onEditClick(e, row)}
        >
            <Edit className="align-middle" size={16} />
        </Button>
        <Button
            color="danger"
            className="mr-1 mb-1"
            onClick={(e) => onDeleteClick(e, row)}
        >
            <Trash className="align-middle" size={16} />
        </Button>
    </>
);

export default RowActions;