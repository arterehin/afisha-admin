import React, { 
    useEffect 
} from "react";
import useLanguage from "@hooks/useLanguage";
import useForm from "@hooks/useForm";
import useToast from "@hooks/useToast";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { useTranslation } from "react-i18next";
import { postUser } from "@redux/modules/users/actions";

import TabHeader from "@components/TabHeader";
import Form from "./Form";

const getInitialState = (locale) => ({
    username: "",
    email: "",
    password: "",
    locale,
    status: "ACTIVE",
    fullName: "",
    biography: "",
    isStaffMember: false,
    avatarFileName: "",
    telegramUsername: "",
    managedLocales: [],
    roles: []
});

const Add = ({ selectTab, ...props }) => {
    const { t } = useTranslation("users");
    const { fallback } = useLanguage();
    const dispatch = useDispatch();
    const processing = useSelector(state => state.users.ui.post.loading);
    const {
        state,
        setState,
        onChange,
        reset,
        setTranslation,
        getTranslation,
        isRequired,
        formRef
    } = useForm(getInitialState(fallback));

    useEffect(() => {
        setState((state) => ({
            ...state,
            avatarRemove: !state.avatarFileName
        }))
    }, [setState, state.avatarFileName]);

    useToast(
        state => state.users.ui.post.success,
        state => state.users.ui.post.error,
        "users"
    );

    useToast(
        state => state.users.ui.put.success,
        state => state.users.ui.put.error,
        "users"
    );

    const handleFormSubmit = async () => {
        await dispatch(postUser(state));

        reset();
    }

    const handleFormDiscard = () => {
        selectTab("list");
        reset();
    }

    return (
        <>
            <TabHeader
                title={t("add.title")}
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
                tab={props}
                formRef={formRef}
            />
        </>
    );
};

export default Add;