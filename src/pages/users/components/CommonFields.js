import React from "react";
import useLanguage from "@hooks/useLanguage";
import useRole from "@hooks/useRole";
import { useTranslation } from "react-i18next";

import {
    AvGroup,
    AvInput
} from "availity-reactstrap-validation";
import {
    Col,
    Row,
    Label,
    FormGroup,
    CustomInput
} from "reactstrap";
import CheckboxGroup from "react-checkbox-group";
import ImageUpload from "@components/ImageUpload";
import CustomCheckbox from "@components/CustomCheckbox";

const Fields = ({
    state = {},
    onChange,
    tab,
    processing: disabled
}) => {
    const { locales, languages } = useLanguage();
    const { roles } = useRole();
    const { t } = useTranslation("users");

    const handleStatusChange = (e) => {
        const { checked, name } = e.target;

        onChange && onChange({
            name,
            value: checked ? "ACTIVE" : "INACTIVE"
        });
    }

    const handleStaffChange = (e) => {
        const { checked, name } = e.target;

        onChange && onChange({
            name,
            value: checked
        });
    }

    const handleCheckboxChange = (name) => (value) => {
        onChange && onChange({
            name,
            value
        });
    };

    const handleImageChange = (file) => {
        onChange && onChange({
            name: "avatarFileName",
            value: file ? file.base64.split(",")[1] : ""
        });
    }

    return (
        <>
            <FormGroup>
                <Label>{t("avatar")}</Label>
                <ImageUpload
                    defaultImage={state.avatarFileName}
                    onChange={handleImageChange}
                    disabled={disabled}
                />
            </FormGroup>
            <AvGroup>
                <Label>{t("form.telegram")}</Label>
                <AvInput
                    type="text"
                    id={`telegram_${tab.id}`}
                    name="telegramUsername"
                    placeholder={t("form.telegram")}
                    onChange={onChange}
                    value={state.telegramUsername}
                />
            </AvGroup>
            <Row form>
                <Col lg="6">
                    <FormGroup>
                        <Label>{t("roles")}</Label>
                        <CheckboxGroup
                            value={state.roles}
                            onChange={handleCheckboxChange("roles")}>
                            {(Checkbox) => (
                                <>
                                    {Object.keys(roles).map((role) => (
                                        <CustomCheckbox
                                            id={`role_${tab.id}_${role}`}
                                            key={`role_${tab.id}_${role}`}
                                            label={roles[role].label}
                                        >
                                            <Checkbox 
                                                value={role}
                                                disabled={disabled} 
                                            />
                                        </CustomCheckbox>
                                    ))}
                                </>
                            )}
                        </CheckboxGroup>
                    </FormGroup>
                </Col>
                <Col lg="6">
                    <FormGroup>
                        <Label>{t("status.label")}</Label>
                        <CustomInput
                            type="switch"
                            id={`status_${tab.id}`}
                            className="mb-2"
                            name="status"
                            checked={state.status === "ACTIVE"}
                            label={t("status.switch")}
                            onChange={handleStatusChange}
                            disabled={disabled}
                        />
                        <CustomInput
                            type="switch"
                            id={`staff_${tab.id}`}
                            className="mb-2"
                            name="isStaffMember"
                            checked={state.isStaffMember}
                            label={t("status.staff")}
                            onChange={handleStaffChange}
                            disabled={disabled}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col lg="6">
                    <FormGroup>
                        <Label>{t("languages")}</Label>
                        <CheckboxGroup
                            value={state.managedLocales}
                            onChange={handleCheckboxChange("managedLocales")}>
                            {(Checkbox) => (
                                <>
                                    {locales.map((locale) => (
                                        <CustomCheckbox
                                            id={`language_${tab.id}_${locale}`}
                                            key={`language_${tab.id}_${locale}`}
                                            label={languages[locale].label}
                                        >
                                            <Checkbox 
                                                value={locale}
                                                disabled={disabled} 
                                            />
                                        </CustomCheckbox>
                                    ))}
                                </>
                            )}
                        </CheckboxGroup>
                    </FormGroup>
                </Col>
                <Col lg="6">
                    <FormGroup>
                        <Label>{t("default-language")}</Label>
                        {locales.map((locale) => (
                            <CustomInput
                                id={`locale_${tab.id}_${locale}`}
                                key={`locale_${tab.id}_${locale}`}
                                type="radio"
                                name="locale"
                                label={languages[locale].label}
                                checked={state.locale === locale}
                                onChange={onChange}
                                value={locale}
                                className="mb-2"
                                disabled={disabled}
                            />
                        ))}
                    </FormGroup>
                </Col>
            </Row>
        </>
    );
};

export default Fields;