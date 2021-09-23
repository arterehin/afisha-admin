import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";

import { deleteMaterials } from "@redux/modules/materials/list/actions";

import ConfirmationModal from "@components/ConfirmationModal";
import Loader from "@components/Loader";

const Delete = ({ material = {}, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("materials");
  const loading = useSelector(state => state.materials.list.ui.delete.loading);

  const handleConfirm = async () => {
    try {
      await dispatch(deleteMaterials(material));
    } finally {
      onClose();
    }
  }

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={t("delete.title")}
      size="sm"
    >
      <Loader loading={loading} className="py-3">
        <div className="text-left">
          <p className="mb-0">
            <Trans i18nKey="delete.text">
              Действиетльно хотите удалить материал <strong>&laquo;{{ material: material.title }}&raquo;</strong>?
            </Trans>
          </p>
        </div>
      </Loader>
    </ConfirmationModal>
  );
};

export default Delete;