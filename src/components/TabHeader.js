import React from "react";

import { CardTitle } from "reactstrap";

const TabHeader = ({ title, subTitle }) => (
    <div className="tab-header">
        <CardTitle tag="h5">
            {title}
        </CardTitle>
        <h6 className="card-subtitle text-muted">
            {subTitle}
        </h6>
    </div>
);

export default TabHeader;