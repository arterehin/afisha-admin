import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import useToast from "@hooks/useToast";
import { getMovies } from "@redux/modules/movies/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import columns from "./columns";

const MoviesList = () => {
  const { t, i18n } = useTranslation("dashboard");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.movies.data);
  const loading = useSelector((state) => state.movies.ui.get.loading);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(
      getMovies({
        itemsPerPage: itemsPerPage,
      }),
    );
  }, [dispatch, i18n.language]);

  useToast(
    () => {},
    (state) => state.movies.ui.get.error,
    "movies",
  );

  const movies = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      index,
    }));
  }, [data]);

  return (
    <>
      <h4>{t("catalog.movies.title")}</h4>
      <Loader className="py-5" loading={loading}>
        <Pagination
          options={{
            sizePerPage: itemsPerPage,
            hidePageListOnlyOnePage: true,
          }}
        >
          <BootstrapTable
            keyField="@id"
            data={movies}
            columns={columns({}, t)}
            bootstrap4
            bordered={false}
          />
        </Pagination>
      </Loader>
    </>
  );
};

export default MoviesList;
