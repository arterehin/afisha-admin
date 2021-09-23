import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import columns from "./columns";
import useToast from "@hooks/useToast";
import useLanguage from "@hooks/useLanguage";
import { getMaterials } from "@redux/modules/materials/list/actions";

import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import BootstrapTable from "react-bootstrap-table-next";
import Delete from "../components/Delete";

const List = ({ enableTab }) => {
  const { t } = useTranslation("materials");
  const { URLLanguage } = useLanguage();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.materials.list.data);
  const loading = useSelector((state) => state.materials.list.ui.get.loading);
  const [modalState, setModalState] = useState({
    isOpen: false,
    material: {},
  });
  useEffect(() => {
    dispatch(getMaterials());
  }, [dispatch, URLLanguage]);

  useToast(
    (state) => state.materials.list.ui.delete.success,
    (state) => state.materials.list.ui.delete.error,
    "materials"
  );

  const handleEditClick = (e, material) => {
    enableTab("edit", material);
  };

  const handleDeleteClick = (e, material) => {
    setModalState({
      isOpen: true,
      material,
    });
  };

  const handleModalClose = () => {
    setModalState({
      isOpen: false,
    });
  };

  const materials = useMemo(() => {
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
            data={materials}
            columns={columns({
              onDeleteClick: handleDeleteClick,
              onEditClick: handleEditClick,
            }, t)}
          />
        </Pagination>
      </Loader>
      <Delete {...modalState} onClose={handleModalClose} />
    </>
  );
};

export default List;
