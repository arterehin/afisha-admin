import React, {
  useState,
  useRef,
  useEffect
} from "react";
import { toastr } from "react-redux-toastr";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { useTranslation } from "react-i18next";
import { postCity } from "@redux/modules/settings/cities/actions";
import { getCountries } from "@redux/modules/settings/countries/actions";
import useFetch from "@hooks/useFetch";
import useForm from "@hooks/useForm";

import {
  Col,
  Container,
  Row
} from "reactstrap";
import YandexMap from "@components/YandexMap";
import Form from "@components/Form";
import LanguageTabs from "@components/LanguageTabs";
import TabHeader from "@components/TabHeader";
import Fields from "./Fields";

const initialState = {
  country: "",
  slug: ""
};

const Add = ({ selectTab }) => {
  const { t, i18n } = useTranslation(["settings.cities-and-districts", "common"]);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const countries = useSelector(state => state.settings.countries);
  const {
    state,
    setState,
    onChange,
    reset,
    setTranslation,
    getTranslation,
    isRequired,
    formRef
  } = useForm(initialState);

  const { loading } = useFetch(async () => {
    await dispatch(getCountries());
  }, false, [i18n.language]);

  useEffect(() => {
    if (countries.length > 0) {
      setState((state) => ({
        ...state,
        country: countries[0]["@id"]
      }));
    }
  }, [setState, countries]);

  const handleFormDiscard = () => {
    selectTab("list");
    resetState();
  }

  const handleFormSubmit = async () => {
    const { latitude, longitude } = state;

    if (latitude && longitude) {
      setProcessing(true);
      try {
        await dispatch(postCity(state));
        resetState();
        toastr.success(
          t("common:toasts.success.title"),
          t("toasts.add-city.success")
        );
      } catch {
        toastr.error(
          t("common:toasts.error.title"),
          t("common:toasts.error.request.message")
        );
      } finally {
        setProcessing(false);
      }

    } else {
      toastr.error(
        t("common:toasts.error.title"),
        t("toasts.add-city.error")
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

  const resetState = () => {
    reset();
    mapRef.current && mapRef.current.reset();
  }

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
            ref={formRef}
            header={
              <TabHeader
                title={t("add-city")}
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
            processing={processing}
            ref={mapRef}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Add;
