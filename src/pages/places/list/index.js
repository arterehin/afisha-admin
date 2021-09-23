import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import columns from "./columns";
import useToast from "@hooks/useToast";
import { getPlaces } from "@redux/modules/places/list/actions";

import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import Delete from "../components/Delete";

const List = ({ enableTab }) => {
  const { t, i18n } = useTranslation("places");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.places.list.data);
  const loading = useSelector((state) => state.places.list.ui.get.loading);
  const [modalState, setModalState] = useState({
    isOpen: false,
    place: {},
  });

  useEffect(() => {
    dispatch(getPlaces());
  }, [dispatch, i18n.language]);

  useToast(
    (state) => state.places.list.ui.delete.success,
    (state) => state.places.list.ui.delete.error,
    "users",
  );

  const handleEditClick = (e, place) => {
    enableTab("edit", place);
  };

  const handleDeleteClick = (e, place) => {
    setModalState({
      isOpen: true,
      place,
    });
  };

  const handleModalClose = () => {
    setModalState({
      isOpen: false,
    });
  };

  const places = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      index,
    }));
  }, [data]);

  return (
    <>
      <Loader className="py-5" loading={loading}>
        <Pagination
          options={{
            sizePerPage: 20,
            hidePageListOnlyOnePage: true,
          }}
        >
          <BootstrapTable
            bootstrap4
            bordered={false}
            keyField="@id"
            data={places}
            columns={columns(
              {
                onDeleteClick: handleDeleteClick,
                onEditClick: handleEditClick,
              },
              t,
            )}
          />
        </Pagination>
      </Loader>
      <Delete {...modalState} onClose={handleModalClose} />
    </>
  );
};

export default List;
