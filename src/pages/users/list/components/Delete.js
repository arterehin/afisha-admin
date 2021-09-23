import React from "react";
import {
  useDispatch,
  useSelector
} from "react-redux";
import {
  Trans,
  useTranslation
} from "react-i18next";
import { deleteUser } from "@redux/modules/users/actions";

import ConfirmationModal from "@components/ConfirmationModal";
import Loader from "@components/Loader";

const Delete = ({ user = {}, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("users");
  const loading = useSelector(state => state.users.ui.delete.loading);

  const handleConfirm = async () => {
    try {
      await dispatch(deleteUser(user));
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
              Действиетльно хотите удалить пользователя <strong>&laquo;{{ user: user.fullName }}&raquo;</strong>?
                        </Trans>
          </p>
        </div>
      </Loader>
    </ConfirmationModal>
  );
};

export default Delete;