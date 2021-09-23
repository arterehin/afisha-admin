import React, { useEffect } from "react";
import { getSections } from "@redux/modules/sections/actions";
import { getUsers } from "@redux/modules/users/actions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import useToast from "@hooks/useToast";
import Page from "@components/Page";
import tabs from "./tabs";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation("dashboard");

  useEffect(() => {
    dispatch(getSections());
  }, [dispatch, i18n.language]);

  useEffect(() => {
    dispatch(
      getUsers({
        isStaffMember: true,
      }),
    );
  }, [dispatch, i18n.language]);

  useToast(
    () => {},
    (state) => state.sections.ui.get.error,
    "sections",
  );

  useToast(
    () => {},
    (state) => state.users.ui.get.error,
    "users",
  );

  return <Page tabs={tabs} namespace="dashboard" />;
};

export default Dashboard;
