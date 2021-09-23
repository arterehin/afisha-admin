import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toastr } from "react-redux-toastr";
import { deleteDistrict } from "@redux/modules/settings/districts/actions";
import { Trans, useTranslation } from "react-i18next";

import ConfirmationModal from "@components/ConfirmationModal";
import Loader from "@components/Loader";

const Delete = ({ isOpen, onClose, city, district }) => {
  const { t } = useTranslation(["settings.cities-and-districts", "common"]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      await dispatch(deleteDistrict(
        city,
        district["@id"]
      ));
      toastr.success(
        t("common:toasts.success.title"),
        t("toasts.delete-district.success"),
      );
    } catch {
      toastr.error(
        t("common:toasts.error.title"),
        t("common:toasts.error.request.message")
      );
    } finally {
      onClose();
      setLoading(false);
    }
  }

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={t("delete-modal.district.title")}
      confirmText={t("delete-modal.confirm")}
      cancelText={t("delete-modal.cancel")}
      size="sm"
    >
      <Loader loading={loading} className="py-3">
        <div className="text-left">
          <p className="mb-0">
            <Trans i18nKey="settings.cities-and-districts:delete-modal.district.message">
              Действиетльно хотите удалить район <strong>&laquo;{{ district: district.name }}&raquo;</strong>?
            </Trans>
          </p>
        </div>
      </Loader>
    </ConfirmationModal>
  );
};

export default Delete;
