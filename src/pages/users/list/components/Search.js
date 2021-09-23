import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "debounce";
import { useTranslation } from "react-i18next";

import {
    CardTitle,
    Row,
    Col
} from "reactstrap";
import UserSearch from "@components/Search";
import { getUsers } from "@redux/modules/users/actions";

const Search = () => {
    const { t } = useTranslation("users");
    const dispatch = useDispatch();

    const stack = useCallback(debounce((username) => {
        dispatch(getUsers({ username }));
    }, 300), []);

    const handleChange = useCallback((e) => {
        const { value } = e.target;

        stack(value);
    }, [stack]);

    return (
        <div className="mb-4">
            <CardTitle tag="h5">{t("search")}</CardTitle>
            <Row>
                <Col md="5">
                    <UserSearch
                        onChange={handleChange}
                        placeholder={t("list.username")} 
                    /> 
                </Col>
            </Row>
        </div>
    );
};

export default Search;