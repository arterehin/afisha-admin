import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";

import { deletePlace } from "@redux/modules/places/list/actions";

import ConfirmationModal from "@components/ConfirmationModal";
import Loader from "@components/Loader";

const Delete = ({ place = {}, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("places");
  const loading = useSelector(state => state.places.list.ui.delete.loading);

  const handleConfirm = async () => {
    try {
      await dispatch(deletePlace(place));
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
              Действиетльно хотите удалить место <strong>&laquo;{{ place: place.name }}&raquo;</strong>?
            </Trans>
          </p>
        </div>
      </Loader>
    </ConfirmationModal>
  );
};

export default Delete;