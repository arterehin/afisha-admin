import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { mapContacts, mapAttributes, mapFieldsToRequest } from "@utils";
import { createSelector } from "reselect";
import useFormState from "@hooks/useFormState";
import useLanguage from "@hooks/useLanguage";

import { putPlace } from "@redux/modules/places/list/actions";
import { getEditPlaceAttributes } from "@redux/modules/places/edit/attributes/actions";
import { getEditPlaceFields } from "@redux/modules/places/edit/fields/actions";

import Form from "./Form";

const placeSelector = createSelector(
  state => state.places.list.data,
  (state, id) => id,
  (items, id) => {
    if (id) {
      return items.find(({ "@id": itemId }) => itemId === id);
    }
  }
);

const Edit = ({
  data,
  id,
  disableTab
}) => {
  const dispatch = useDispatch();
  const { locales } = useLanguage();
  const { i18n } = useTranslation();
  const { "@id": placeId } = data.edit;
  const fields = useSelector(state => state.places[id].fields.data);
  const attributes = useSelector(state => state.places[id].attributes.data);
  const place = useSelector(state => placeSelector(state, placeId));
  const form = useFormState(mapContacts(place));
  const {
    values,
    setValue,
    setValues,
    validate
  } = form;

  useEffect(() => {
    if (values.type) {
      dispatch(getEditPlaceFields(values.type));
      dispatch(getEditPlaceAttributes(placeId));
    }
  }, [values.type, placeId, i18n.language, dispatch]);

  useEffect(() => {
    const hasFields = fields.length > 0;
    const hasAttributes = attributes.length > 0;

    if (hasFields && hasAttributes) {
      const result = mapAttributes(fields, attributes);

      setValue("attributes", result);
    }
  }, [fields, attributes, setValue]);

  useEffect(() => {
    setValues(mapContacts(place));
  }, [place, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const place = mapFieldsToRequest({
        fields,
        attributes,
        locales,
        data: values
      });

      await dispatch(putPlace(place));
      handleDiscart();
    }
  }

  const handleDiscart = () => {
    disableTab("edit");
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

export default Edit;