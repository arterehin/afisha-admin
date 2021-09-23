import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import useToast from "@hooks/useToast";
import { getEvents } from "@redux/modules/events/list/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Toolbar from "./components/Toolbar";
import { columns, rowClasses } from "./rows-and-columns";

const EventsList = ({ enableTab }) => {
  const { t, i18n } = useTranslation("dashboard");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.events.list.data);
  const eventsLoading = useSelector(
    (state) => state.events.list.ui.get.loading,
  );
  const sectionsLoading = useSelector((state) => state.sections.ui.get.loading);
  const staffMembersLoading = useSelector(
    (state) => state.users.ui.get.loading,
  );
  const itemsPerPage = 20;

  const isLoading = () => {
    return eventsLoading || sectionsLoading || staffMembersLoading;
  };

  useEffect(() => {
    dispatch(
      getEvents({
        itemsPerPage: itemsPerPage,
        order: {
          publishedAt: "DESC",
          createdAt: "DESC",
        },
      }),
    );
  }, [dispatch, i18n.language]);

  useToast(
    () => {},
    (state) => state.events.list.ui.get.error,
    "events",
  );

  const events = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      index,
    }));
  }, [data]);

  return (
    <>
      <Loader className="py-5" loading={isLoading()}>
        <Toolbar />
        <Pagination
          options={{
            sizePerPage: itemsPerPage,
            hidePageListOnlyOnePage: true,
          }}
        >
          <BootstrapTable
            keyField="@id"
            data={events}
            columns={columns({}, t)}
            rowClasses={rowClasses}
            bootstrap4
            bordered={false}
          />
        </Pagination>
      </Loader>
    </>
  );
};

export default EventsList;
