import React, { 
  useCallback, 
  useEffect, 
  useState 
} from "react";
import { 
  useSelector, 
  useDispatch 
} from "react-redux";
import { 
  Trans, 
  useTranslation 
} from "react-i18next";
import { toastr } from "react-redux-toastr";
import { 
  getDistricts, 
  removeDistricts 
} from "@redux/modules/settings/districts/actions";
import { deleteCity } from "@redux/modules/settings/cities/actions";

import ConfirmationModal from "@components/ConfirmationModal";
import Loader from "@components/Loader";

const Delete = ({ city, isOpen, onClose }) => {
  const { t } = useTranslation(["settings.cities-and-districts", "common"]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const districts = useSelector(state => state.settings.districts.data[city["@id"]]);

  const fetchDistricts = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch(getDistricts(city["@id"]));
    } finally {
      setLoading(false);
    }
  }, [dispatch, city]);

  useEffect(() => {
    if (isOpen && !districts) {
      fetchDistricts();
    }
  }, [fetchDistricts, districts, isOpen]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await dispatch(deleteCity(city["@id"]));
      dispatch(removeDistricts(city["@id"]))
      toastr.success(
        t("common:toasts.success.title"),
        t("toasts.delete-city.success")
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
      title={t("delete-modal.city.title")}
      confirmText={t("delete-modal.confirm")}
      cancelText={t("delete-modal.cancel")}
      loading={loading}
      size="sm"
    >
      <Loader loading={loading} className="py-3">
        <div className="text-left">
          <p className="mb-0">
            <Trans i18nKey="settings.cities-and-districts:delete-modal.city.message">
              Действиетльно хотите удалить город <strong>&laquo;{{ city: city.name }}&raquo;</strong> и все связанные районы?
            </Trans>
          </p>
          {districts && (
            <ul className="mt-2 mb-0">
              {districts.slice(0, 5).map((district) => (
                <li key={district["@id"]}>{district.name}</li>
              ))}
              {(districts.length > 5) && (
                <li>...</li>
              )}
            </ul>
          )}
        </div>
      </Loader>
    </ConfirmationModal>
  );
};

export default Delete;