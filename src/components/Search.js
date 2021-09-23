import React from "react";

import {
    Input,
    InputGroup
} from "reactstrap";
import { Search as SearchIcon } from "react-feather";

const Search = (props) => (
    <InputGroup size="lg">
        <div className="input-group-prepend">
            <span className="input-group-text">
                <SearchIcon size={18} />
            </span>
        </div>
        <Input {...props} />
    </InputGroup>
);

export default Search;