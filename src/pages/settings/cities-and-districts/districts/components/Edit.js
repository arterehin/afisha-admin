import React, {
  useState,
  useCallback,
  useEffect
} from "react";
import { toastr } from "react-redux-toastr";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { createSelector } from "reselect";
import { putDistrict } from "@redux/modules/settings/districts/actions";
import { disableTab as disableTabAction } from "@redux/modules/settings/ui/actions";
import { useTranslation } from "react-i18next";
import useFetch from "@hooks/useFetch";
import useIsMounted from "@hooks/useIsMounted";
import useForm from "@hooks/useForm";
import apiService from "@services/apiService";

import {
  Col,
  Container,
  Row
} from "reactstrap";
import Form from "@components/Form";
import LanguageTabs from "@components/LanguageTabs";
import TabHeader from "@components/TabHeader";
import Fields from "./Fields";

const hasDistrictSelector = createSelector(
  state => state.settings.districts.data,
  (_, data) => data,
  (items, data) => {
    const { city, district } = data;
    return items[city] && items[city].some(item => item["@id"] === district);
  }
);

const Edit = ({ disableTab, data, visible }) => {
  const { t } = useTranslation(["settings.cities-and-districts", "common"]);
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const isMounted = useIsMounted();
  const district = useSelector(state => state.settings.ui.district.edit.current);
  const hasDistrict = useSelector(state => hasDistrictSelector(state, {
    district,
    city: data["edit-district"]
  }));
  const {
    state,
    onChange,
    setTranslation,
    getTranslation,
    isRequired,
    transformState
  } = useForm({
    city: "",
    slug: ""
  });

  const { loading } = useFetch(async () => {
    try {
      const { data } = await apiService.get(`${district}?groups[]=district:translations`);

      if (isMounted.current) {
        transformState(data);
      }
    } catch { }
  }, false, [district]);

  const handleFormDiscard = useCallback(() => {
    disableTab("edit-district");
    dispatch(disableTabAction({
      type: "district",
      mode: "edit",
    }));
  }, [dispatch, disableTab]);

  const handleFormSubmit = async () => {
    const { "@id": id } = state;

    setProcessing(true);
    try {
      await dispatch(putDistrict(id, state));
      handleFormDiscard();
      toastr.success(
        t("common:toasts.success.title"),
        t("toasts.edit-district.success"),
      );
    } catch {
      toastr.error(
        t("common:toasts.error.title"),
        t("common:toasts.error.request.message")
      );
    } finally {
      setProcessing(false);
    }
  }

  useEffect(() => {
    if (!hasDistrict && visible) {
      handleFormDiscard();
    }
  }, [handleFormDiscard, hasDistrict, visible]);

  return (
    <Container fluid className="p-0">
      <Row>
        <Col lg="7">
          <Form
            state={state}
            processing={processing}
            loading={loading}
            onSubmit={handleFormSubmit}
            onDiscard={handleFormDiscard}
            onChange={onChange}
            setTranslation={setTranslation}
            getTranslation={getTranslation}
            isRequired={isRequired}
            header={
              <TabHeader
                title={t("edit-district")}
                subTitle={t("form.subtitle")}
              />
            }
            render={(formProps) => (
              <LanguageTabs
                {...formProps}
                component={Fields}
              />
            )}
          />
        </Col>
      </Row>
    </Container >
  );
};

export default Edit;
