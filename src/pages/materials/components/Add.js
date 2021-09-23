import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFormState from "@hooks/useFormState";
import useLanguage from "@hooks/useLanguage";
import useToast from "@hooks/useToast";

import { getTags } from "@redux/modules/tags/actions";
import { getSections } from "@redux/modules/sections/actions";
import { getBooks } from "@redux/modules/books/actions";
import { getCelebrities } from "@redux/modules/celebrities/actions";
import { getMovies } from "@redux/modules/movies/actions";
import { getPlaces } from "@redux/modules/places/list/actions";
import { getUsers } from "@redux/modules/users/actions";
import { getPerformances } from "@redux/modules/performances/actions";
import { getMaterials } from "@redux/modules/materials/list/actions";
import { postMaterials } from "@redux/modules/materials/list/actions";

import { initialValue } from "@utils/forms/material/initialValue";

import Form from "./Form";

const Add = props => {
  const {
    id,
    selectTab
  } = props;
  const dispatch = useDispatch();
  const { URLLanguage } = useLanguage();
  const form = useFormState(initialValue());
  const {
    values,
    validate,
    setErrors,
    reset
  } = form;

  useToast(
    state => state.materials.list.ui.post.success,
    state => state.materials.list.ui.post.error,
    "materials"
  );

  useToast(
    state => state.materials.list.ui.put.success,
    state => state.materials.list.ui.put.error,
    "materials"
  );

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

    try {
      if (validate()) {
        await dispatch(postMaterials(values, setErrors));
        selectTab("list");
        reset();
        await dispatch(getMaterials());
      }
    } catch (e) {
        console.error(e);
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