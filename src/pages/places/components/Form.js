import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Col, Container, Row } from "reactstrap";
import TabHeader from "@components/TabHeader";
import FormFooter from "@components/FormFooter";
import LanguageTabs from "@components/LanguageTabs";
import YandexMap from "@components/YandexMap";
import Loader from "@components/Loader";
import Fields from "./Fields";
import Schedule from "./Schedule";

const Form = ({
  onSubmit,
  onDiscard,
  ...props
}) => {
  const { values, handleChange, setValues } = props.form; 
  const { t } = useTranslation("places");
  const placesLoading = useSelector(state => state.places.list.ui.get.loading);
  const placeTypesLoading = useSelector((state) => state.placeTypes.ui.get.loading);
  const districtsLoading = useSelector((state) => state.districts.ui.get.loading);
  const citiesLoading = useSelector((state) => state.cities.ui.get.loading);
  const processing = useSelector(state => state.places.list.ui.post.loading);

  const isLoading = () => {
    return placesLoading
      || placeTypesLoading
      || districtsLoading
      || citiesLoading;
  };

  const handleCoordsChange = (coords) => {
    const [latitude, longitude] = coords;

    setValues({
      ...values,
      latitude: latitude.toFixed(7),
      longitude: longitude.toFixed(7)
    });
  }

  const getCenter = () => {
    const { latitude, longitude } = values;

    if (latitude && longitude) {
      return [
        latitude,
        longitude
      ];
    }
  }

  return (
    <Container fluid className="p-0">
      <Row>
        <Col lg="6">
          <div className="d-flex flex-column h-100">
            <TabHeader
              title={t(`${props.formId}.title`)}
              subTitle="Подзаголовок"
            />
            <Loader className="flex-grow-1" loading={isLoading()}>
              <form onSubmit={onSubmit}>
                <LanguageTabs
                  {...props}
                  processing={processing}
                  component={Fields}
                />
                <FormFooter onDiscard={onDiscard}/>
              </form>
            </Loader>
          </div>
        </Col>
        <Col lg="6">
          <YandexMap 
            className="mb-4"
            processing={processing}
            center={getCenter()}
            onChange={handleCoordsChange} 
          />
          <Schedule
            name="schedule"
            value={values.schedule}
            onChange={handleChange} 
            disabled={processing}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Form;