import React  from 'react';
import cx from 'classnames';
import {FormGroup, Label, Input, Col, Row, Button} from "reactstrap";
import { useTranslation } from "react-i18next";
import { Trash } from "react-feather";
import { ResourceSelect } from "@components/ResourceSelect";
import { formatDate, formatTime } from "@utils/formats";
import styles from './EventScheduleField.module.scss';

export const EventScheduleField = props => {
  const {
    form,
    idx,
    onDelete,
    value
  } = props;
  const { setValue, values } = form;
  const { t } = useTranslation('materials');

  const handlePlaceChange = (value) => {
    const newValue = values.eventSchedules;
    newValue[idx].place = value;
    setValue('eventSchedules', newValue);
  };

  const handleStartDateTimeChange = e => {
    const date = new Date(e.target.value);
    const newValue = values.eventSchedules;
    newValue[idx].startDate = formatDate(date);
    newValue[idx].startTime = formatTime(date);
    setValue('eventSchedules', newValue);
  };

  const handleEndDateTimeChange = e => {
    const date = new Date(e.target.value);
    const newValue = values.eventSchedules;
    newValue[idx].endDate = formatDate(date);
    newValue[idx].endTime = formatTime(date);
    setValue('eventSchedules', newValue);
  };

  const startDateTimeValue = value.startDate && value.startTime ?
    `${value.startDate}T${value.startTime}` : '';

  const endDateTimeValue = value.endDate && value.endTime ?
    `${value.endDate}T${value.endTime}` : '';

  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col>
              <ResourceSelect
                form={form}
                selector={state => state.places.list.data}
                onChange={handlePlaceChange}
                value={values.eventSchedules[idx].place}
                name="place"
                label={t("place")}
                placeholder={t("places")}
              />
            </Col>
            <Col lg={1}>
              <Button
                className={cx(styles.deleteButton, "w-100")}
                color="danger"
                onClick={onDelete}
              >
                <Trash className="align-middle" size={16} />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>{t("startTime")}</Label>
                <Input
                  name="startTime"
                  type="datetime-local"
                  bsSize="lg"
                  placeholder={t("startTime")}
                  value={startDateTimeValue}
                  onChange={handleStartDateTimeChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>{t("endTime")}</Label>
                <Input
                  name="endTime"
                  type="datetime-local"
                  bsSize="lg"
                  placeholder={t("endTime")}
                  value={endDateTimeValue}
                  onChange={handleEndDateTimeChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
