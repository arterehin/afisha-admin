import React, { 
    useEffect,
    useCallback 
} from "react";
import { useTranslation } from "react-i18next";
import { updateUser } from "@redux/modules/users/actions";
import useForm from "@hooks/useForm";
import {
    useDispatch,
    useSelector
} from "react-redux";
import { createSelector } from "reselect";

import TabHeader from "@components/TabHeader";
import Form from "./Form";

const dataSelector = createSelector(
    state => state.users.data,
    (_, data) => data["@id"],
    (items, id) => items.find(item => item["@id"] === id)
);

const Edit = ({ disableTab, data, visible, ...props }) => {
    const { t } = useTranslation("users");
    const dispatch = useDispatch();
    const processing = useSelector(state => state.users.ui.put.loading);
    const currentData = useSelector(state => dataSelector(state, data["edit"]))
    const {
        state,
        onChange,
        setTranslation,
        getTranslation,
        transformState,
        isRequired
    } = useForm(currentData);

    const handleFormDiscard = useCallback(() => {
        disableTab("edit");
    }, [disableTab]);

    const handleFormSubmit = async () => {
        await dispatch(updateUser(state));

        handleFormDiscard();
    }

    useEffect(() => {
        transformState(currentData);
    }, [currentData, transformState]);

    useEffect(() => {
        if(!currentData && visible) {
            handleFormDiscard();
        }
    }, [handleFormDiscard, currentData, visible]);

    return (
        <>
            <TabHeader
                title={t("edit.title")}
                subTitle={t("subtitle")}
            />
            <Form
                state={state}
                processing={processing}
                onSubmit={handleFormSubmit}
                onDiscard={handleFormDiscard}
                onChange={onChange}
                setTranslation={setTranslation}
                getTranslation={getTranslation}
                isRequired={isRequired}
                tab={{
                    ...props, 
                    data, 
                    visible 
                }}
            />
        </>
    );
};

export default Edit;