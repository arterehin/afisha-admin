import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { debounce } from "debounce";
import apiService from "@services/apiService";

import { FormGroup, Label, Input, Col, Row } from "reactstrap";
import PlaceFields from "./PlaceFields";
import Contacts from "./Contacts";
import Dropdown from "@components/Dropdown";
import Message from "@components/ValidationMessage";

const Fields = (props) => {
  const [chains, setChains] = useState([]);
  const { activeTab, id: tabId, form, formId, locale, processing } = props;
  const { getError, getValue, values, handleChange, handleBlur, registerRule } = form;
  const { t } = useTranslation(["places", "common"]);
  const cities = useSelector(state => state.cities.data);
  const places = useSelector(state => state.places.list.data);
  const types = useSelector(state => state.placeTypes.data);
  const districts = useSelector(state => state.districts.data);

  const validateRequired = useCallback((value) => {
    if (!value) {
      return t("common:form.required");
    }
  }, [t]);

  const translationsRules = useMemo(() => {
    return {
      [`translations.${locale}.name`]: (value) => {
        if ((activeTab === tabId) && !value) {
          return t("common:form.required");
        }
      }
    };
  }, [locale, activeTab, tabId, t]);

  const requiredRules = useMemo(() => {
    return {
      "type": validateRequired,
      "city": validateRequired,
      "district": validateRequired,
      "slug": (value) => {
        if (value && !/^[a-zA-Z0-9_-]+$/.test(value)) {
          return t("common:form.slug-pattern");
        }
        if (!value) {
          return t("common:form.required");
        }
      }
    };
  }, [validateRequired, t]);

  useEffect(() => {
    registerRule(translationsRules);
  }, [registerRule, translationsRules]);

  useEffect(() => {
    registerRule(requiredRules);
  }, [registerRule, requiredRules]);

  const loadChains = useCallback(debounce((value, callback) => {
    apiService.get("/api/place_chains", {
      params: {
        "translations.name": value
      }
    }).then(({ data }) => {
      if (data && data.length > 0) {
        setChains(data);
        callback(data);
      }
    });
  }, 300), []);

  return (
    <>
      <FormGroup>
        <Label>{t("name")}</Label>
        <Input
          id={`name_${locale}_${formId}`}
          name={`translations.${locale}.name`}
          type="text"
          placeholder={t("name")}
          invalid={!!getError(`translations.${locale}.name`)}
          value={getValue(`translations.${locale}.name`)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={processing}
        />
        <Message text={getError(`translations.${locale}.name`)} />
      </FormGroup>
      <FormGroup>
        <Label>{t("type")}</Label>
        <Dropdown
          id={`type_${locale}_${formId}`}
          name="type"
          placeholder={t("type")}
          options={types}
          labelKey="name"
          valueKey="@id"
          invalid={!!getError("type")}
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={processing}
        />
        <Message text={getError("type")} />
      </FormGroup>
      <PlaceFields {...props} />
      <Contacts {...props} />
      <Row form>
        <Col lg="6">
          <FormGroup>
            <Label>{t("city")}</Label>
            <Dropdown
              id={`city_${locale}_${formId}`}
              name="city"
              placeholder={t("city")}
              options={cities}
              labelKey="name"
              valueKey="@id"
              invalid={!!getError("city")}
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={processing}
            />
            <Message text={getError("city")} />
          </FormGroup>
        </Col>
        <Col lg="6">
          <FormGroup>
            <Label>{t("district")}</Label>
            <Dropdown
              id={`district_${locale}_${formId}`}
              name="district"
              placeholder={t("district")}
              options={districts}
              labelKey="name"
              valueKey="@id"
              invalid={!!getError("district")}
              value={values.district}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={processing}
            />
            <Message text={getError("district")} />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label>{t("subPlaces")}</Label>
        <Dropdown
          id={`places_${locale}_${formId}`}
          name="subPlaces"
          placeholder={t("subPlaces")}
          options={places}
          labelKey="name"
          valueKey="@id"
          isMulti
          value={values.subPlaces}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={processing}
        />
      </FormGroup>
      <FormGroup>
        <Label>{t("parent")}</Label>
        <Dropdown
          id={`parent_${locale}_${formId}`}
          name="parent"
          placeholder={t("parent")}
          options={places}
          labelKey="name"
          valueKey="@id"
          value={values.parent}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={processing}
        />
      </FormGroup>
      <FormGroup>
        <Label>{t("chain")}</Label>
        <Dropdown
          id={`chain_${locale}_${formId}`}
          name="chain"
          placeholder={t("chain")}
          labelKey="name"
          valueKey="@id"
          loadOptions={loadChains}
          options={chains}
          value={values.chain}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={processing}
        />
      </FormGroup>
      <FormGroup>
        <Label>{t("slug")}</Label>
        <Input
          id={`slug_${locale}_${formId}`}
          name="slug"
          type="text"
          placeholder={t("slug")}
          invalid={!!getError("slug")}
          value={values.slug}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={processing}
        />
        <Message text={getError("slug")} />
      </FormGroup>
      <FormGroup>
        <Label>{t("description")}</Label>
        <Input
          id={`description_${locale}_${formId}`}
          name={`translations.${locale}.description`}
          type="textarea"
          rows="5"
          placeholder={t("description")}
          value={getValue(`translations.${locale}.description`)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={processing}
        />
      </FormGroup>
      <FormGroup>
        <Label>{t("address")}</Label>
        <Input
          id={`address_${locale}_${formId}`}
          name={`translations.${locale}.address`}
          type="textarea"
          rows="5"
          placeholder={t("description")}
          value={getValue(`translations.${locale}.address`)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={processing}
        />
      </FormGroup>
    </>
  );
}

export default Fields;
