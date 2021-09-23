import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { 
    AvGroup, 
    AvInput, 
    AvFeedback, 
    AvField 
} from "availity-reactstrap-validation";
import { Label } from "reactstrap";

const Fields = ({ 
    state = {}, 
    onChange, 
    locale,
    activeTab, 
    getTranslation,
    setTranslation,
    isRequired
}) => {
    const { t } = useTranslation(["settings.cities-and-districts", "common"]);
    const countries = useSelector(state => state.settings.countries);

    return (
        <>
            <AvGroup>
                <Label>{t("country")}</Label>
                <AvInput
                    id={`country_${locale}`}
                    type="select"
                    name="country"
                    onChange={onChange}
                    value={state.country}
                >
                    {countries.map((country) => (
                        <option key={country["@id"]} value={country["@id"]}>{country.name}</option>
                    ))}
                </AvInput>
            </AvGroup>
            <AvGroup>
                <Label>{t("city-name")}</Label>
                <AvInput
                    id={`name_${locale}`}
                    type="text"
                    name={`name[${locale}]`}
                    placeholder={t("city-name")}
                    onChange={setTranslation}
                    value={getTranslation({
                        field: "name",
                        locale
                    })}
                    required={isRequired({
                        activeTab,
                        locale
                    })}
                />
                <AvFeedback>{t("common:form.required")}</AvFeedback>
            </AvGroup>
            <AvGroup>
                <AvField
                    label={t("slug")}
                    id={`slug_${locale}`}
                    type="text"
                    name="slug"
                    placeholder={t("slug")}
                    onChange={onChange}
                    value={state.slug}
                    validate={{
                        required: {
                            value: true,
                            errorMessage: t("common:form.required")
                        },
                        pattern: {
                            value: "^[a-zA-Z0-9_-]+$",
                            errorMessage: t("common:form.slug-pattern")
                        }
                    }}
                />
            </AvGroup>
        </>
    );
};

export default Fields;