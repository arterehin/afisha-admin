import React from "react";
import { useTranslation } from "react-i18next";

import {
    AvGroup,
    AvInput,
    AvFeedback
} from "availity-reactstrap-validation";
import {
    Col,
    Row,
    Label,
    FormGroup,
    Input
} from "reactstrap";

const Fields = ({
    state = {},
    onChange,
    locale,
    activeTab,
    getTranslation,
    setTranslation,
    tab,
    isRequired,
    processing: disabled
}) => {
    const { t } = useTranslation(["users", "common"]);

    return (
        <>
            <Row form>
                <Col lg="6">
                    <AvGroup>
                        <Label>{t("form.username")}</Label>
                        <AvInput
                            id={`username_${tab.id}_${locale}`}
                            type="text"
                            name="username"
                            placeholder={t("form.username")}
                            onChange={onChange}
                            value={state.username}
                            required
                        />
                        <AvFeedback>{t("common:form.required")}</AvFeedback>
                    </AvGroup>
                </Col>
                <Col lg="6">
                    <AvGroup>
                        <Label>{t("form.password")}</Label>
                        <AvInput
                            id={`password_${tab.id}_${locale}`}
                            type="password"
                            name="password"
                            placeholder={t("form.password")}
                            onChange={onChange}
                            value={state.password}
                            required={tab.id !== "edit"}
                        />
                        <AvFeedback>{t("common:form.required")}</AvFeedback>
                    </AvGroup>
                </Col>
            </Row>
            <AvGroup>
                <Label>{t("email")}</Label>
                <AvInput
                    id={`email_${tab.id}_${locale}`}
                    type="text"
                    name="email"
                    placeholder={t("email")}
                    onChange={onChange}
                    value={state.email}
                    required
                />
                <AvFeedback>{t("common:form.required")}</AvFeedback>
            </AvGroup>
            <AvGroup>
                <Label>{t("fullname")}</Label>
                <AvInput
                    id={`fullName_${tab.id}_${locale}`}
                    type="text"
                    name={`fullName[${locale}]`}
                    placeholder={t("fullname")}
                    onChange={setTranslation}
                    value={getTranslation({
                        field: "fullName",
                        locale
                    })}
                    required={isRequired({
                        activeTab,
                        locale
                    })}
                />
                <AvFeedback>{t("common:form.required")}</AvFeedback>
            </AvGroup>
            <FormGroup>
                <Label>{t("biography.title")}</Label>
                <Input
                    id={`biography_${tab.id}_${locale}`}
                    type="textarea"
                    name={`biography[${locale}]`}
                    rows="5"
                    onChange={setTranslation}
                    value={getTranslation({
                        field: "biography",
                        locale
                    })}
                    placeholder={t("biography.placeholder")}
                    disabled={disabled}
                />
            </FormGroup>
        </>
    );
};

export default Fields;