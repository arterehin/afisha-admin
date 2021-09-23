import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useFormState from "@hooks/useFormState";
import useLanguage from "@hooks/useLanguage";

import { getTags } from "@redux/modules/tags/actions";
import { getSections } from "@redux/modules/sections/actions";
import { getBooks } from "@redux/modules/books/actions";
import { getCelebrities } from "@redux/modules/celebrities/actions";
import { getMovies } from "@redux/modules/movies/actions";
import { getPlaces } from "@redux/modules/places/list/actions";
import { getUsers } from "@redux/modules/users/actions";
import { getPerformances } from "@redux/modules/performances/actions";
import { putMaterials } from "@redux/modules/materials/list/actions";

import { initialValue } from "@utils/forms/material/initialValue";
import { mapDataToField } from "@utils/forms/material/mapDataToField";

import Form from "./Form";

const Edit = props => {
  const {
    id,
    data,
    selectTab,
    disableTab
  } = props;
  const dispatch = useDispatch();
  const { URLLanguage } = useLanguage();
  const [formLoading, setFormLoading] = useState(true);
  const form = useFormState(initialValue());
  const {
    values,
    validate,
    reset,
    setValues,
    setErrors,
  } = form;

  useEffect(() => {
    mapDataToField(data.edit)
      .then(data => {
        setValues({
          ...values,
          ...data,
        });
        setFormLoading(false);
      })
      .catch(e => console.error(e));
  }, []);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getSections());
    dispatch(getBooks());
    dispatch(getCelebrities());
    dispatch(getMovies());
    dispatch(getPlaces());
    dispatch(getPerformances());
    dispatch(getUsers({
      isStaffMember: true
    }));
  }, [dispatch, URLLanguage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      await dispatch(putMaterials(values, setErrors));
    }
  }

  const handleDiscart = () => {
    selectTab("list");
    disableTab(id);
    reset();
  }

  return (
    <Form
      formId={id}
      form={form}
      loading={formLoading}
      onSubmit={handleSubmit}
      onDiscard={handleDiscart}
    />
  );
};

export default Edit;