import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import useToast from "@hooks/useToast";
import { getPerformances } from "@redux/modules/performances/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import columns from "./columns";

const PerformancesList = () => {
  const { t, i18n } = useTranslation("dashboard");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.performances.data);
  const loading = useSelector((state) => state.performances.ui.get.loading);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(
      getPerformances({
        itemsPerPage: itemsPerPage,
      }),
    );
  }, [dispatch, i18n.language]);

  useToast(
    () => {},
    (state) => state.performances.ui.get.error,
    "performances",
  );

  const performances = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      index,
    }));
  }, [data]);

  return (
    <>
      <h4>{t("catalog.performances.title")}</h4>
      <Loader className="py-5" loading={loading}>
        <Pagination
          options={{
            sizePerPage: itemsPerPage,
            hidePageListOnlyOnePage: true,
          }}
        >
          <BootstrapTable
            keyField="@id"
            data={performances}
            columns={columns({}, t)}
            bootstrap4
            bordered={false}
          />
        </Pagination>
      </Loader>
    </>
  );
};

export default PerformancesList;
