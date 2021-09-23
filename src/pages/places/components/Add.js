import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { mapFieldsToRequest, mapFieldsToState } from "@utils";
import useToast from "@hooks/useToast";
import useFormState from "@hooks/useFormState";
import useLanguage from "@hooks/useLanguage";

import { getPlaceTypes } from "@redux/modules/placeTypes/actions";
import { getCities } from "@redux/modules/cities/actions";
import { getDistricts } from "@redux/modules/districts/actions";
import { getAddPlaceFields } from "@redux/modules/places/add/fields/actions";
import { postPlace } from "@redux/modules/places/list/actions";

import Form from "./Form";

const createInitial = (locales) => {
  const fields = ["name", "description", "address"];

  return {
    type: "",
    city: "",
    district: "",
    slug: "",
    subPlaces: [],
    attributes: {},
    contacts: [],
    translations: locales.reduce((acc, locale) => {
      return {
        ...acc,
        [locale]: fields.reduce((acc, field) => ({
          ...acc,
          [field]: ""
        }), {})
      }
    }, {})
  };
}

const Add = ({
  id,
  selectTab
}) => {
  const { locales } = useLanguage();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const fields = useSelector(state => state.places[id].fields.data);
  const form = useFormState(createInitial(locales));
  const {
    values,
    setValue,
    validate,
    reset
  } = form;

  useEffect(() => {
    dispatch(getPlaceTypes());
    dispatch(getCities());
    dispatch(getDistricts());
  }, [dispatch, i18n.language]);

  useEffect(() => {
    if (values.type) {
      dispatch(getAddPlaceFields(values.type))
    }
  }, [values.type, dispatch]);

  useEffect(() => {
    if (fields.length > 0) {
      const result = mapFieldsToState(fields, locales);

      setValue("attributes", result);
    }
  }, [fields, setValue, locales]);

  useToast(
    state => state.places.list.ui.post.success,
    state => state.places.list.ui.post.error,
    "places"
  );

  useToast(
    state => state.places.list.ui.put.success,
    state => state.places.list.ui.put.error,
    "places"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const place = mapFieldsToRequest({
        fields,
        locales,
        data: values
      });

      await dispatch(postPlace(place));
      reset();
    }
  }

  const handleDiscart = () => {
    selectTab("list");
    reset();
  }

  return (
    <Form
      formId={id}
      form={form}
      onSubmit={handleSubmit}
      onDiscard={handleDiscart}
    />
  );
};

export default Add;