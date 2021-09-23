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
import { putCity } from "@redux/modules/settings/cities/actions";
import { disableTab as disableTabAction } from "@redux/modules/settings/ui/actions";
import { useTranslation } from "react-i18next";
import useFetch from "@hooks/useFetch";
import useIsMounted from "@hooks/useIsMounted";
import useForm from "@hooks/useForm";
import apiService from "@services/apiService";

import { Col, Container, Row } from "reactstrap";
import YandexMap from "@components/YandexMap";
import Form from "@components/Form";
import LanguageTabs from "@components/LanguageTabs";
import TabHeader from "@components/TabHeader";
import Fields from "./Fields";

const hasCitySelector = createSelector(
  state => state.settings.cities,
  (_, city) => city,
  (items, id) => {
    return items.some(item => item["@id"] === id);
  }
);

const Edit = ({ disableTab, visible }) => {
  const { t } = useTranslation(["settings.cities-and-districts", "common"]);
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const isMounted = useIsMounted();
  const city = useSelector(state => state.settings.ui.city.edit.current);
  const hasCity = useSelector(state => hasCitySelector(state, city));
  const {
    state,
    setState,
    onChange,
    setTranslation,
    getTranslation,
    transformState,
    isRequired
  } = useForm({
    country: "",
    slug: ""
  });

  const { loading } = useFetch(async () => {
    try {
      const { data } = await apiService.get(`${city}?groups[]=city:translations`);

      if (isMounted.current) {
        transformState(data);
      }
    } catch { }
  }, false, [city]);

  const getCenter = () => {
    const { latitude, longitude } = state;

    if (latitude && longitude) {
      return [
        latitude,
        longitude
      ];
    }
  }

  const handleFormDiscard = useCallback(() => {
    disableTab("edit-city");
    dispatch(disableTabAction({
      type: "city",
      mode: "edit",
    }));
  }, [dispatch, disableTab]);

  const handleFormSubmit = async () => {
    const { "@id": id } = state;

    setProcessing(true);
    try {
      await dispatch(putCity(id, state));
      handleFormDiscard();
      toastr.success(
        t("common:toasts.success.title"),
        t("toasts.edit-city.success")
      );
    } catch {
      setProcessing(false);
      toastr.error(
        t("common:toasts.error.title"),
        t("common:toasts.error.request.message")
      );
    }
  }

  const handleCoordsChange = (coords) => {
    const [latitude, longitude] = coords;

    setState({
      ...state,
      latitude: latitude.toFixed(7),
      longitude: longitude.toFixed(7)
    });
  }

  useEffect(() => {
    if (!hasCity && visible) {
      handleFormDiscard();
    }
  }, [handleFormDiscard, hasCity, visible]);

  return (
    <Container fluid className="p-0">
      <Row>
        <Col lg="6">
          <Form
            state={state}
            processing={processing}
            loading={loading}
            onSubmit={handleFormSubmit}
            onChange={onChange}
            onDiscard={handleFormDiscard}
            setTranslation={setTranslation}
            getTranslation={getTranslation}
            isRequired={isRequired}
            header={
              <TabHeader
                title={t("edit-city")}
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
        <Col lg="6">
          <YandexMap
            onChange={handleCoordsChange}
            center={getCenter()}
            processing={processing}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Edit;
