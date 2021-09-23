import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import useToast from "@hooks/useToast";
import { getPlaces } from "@redux/modules/places/list/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import columns from "./columns";

const PlacesList = () => {
  const { t, i18n } = useTranslation("dashboard");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.places.list.data);
  const loading = useSelector((state) => state.places.list.ui.get.loading);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(
      getPlaces({
        itemsPerPage: itemsPerPage,
      }),
    );
  }, [dispatch, i18n.language]);

  useToast(
    () => {},
    (state) => state.places.list.ui.get.error,
    "places",
  );

  const places = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      index,
    }));
  }, [data]);

  return (
    <>
      <h4>{t("catalog.places.title")}</h4>
      <Loader className="py-5" loading={loading}>
        <Pagination
          options={{
            sizePerPage: itemsPerPage,
            hidePageListOnlyOnePage: true,
          }}
        >
          <BootstrapTable
            keyField="@id"
            data={places}
            columns={columns({}, t)}
            bootstrap4
            bordered={false}
          />
        </Pagination>
      </Loader>
    </>
  );
};

export default PlacesList;
