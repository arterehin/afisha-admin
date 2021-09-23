import React from 'react';
import { FormGroup, Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { EventScheduleField } from "./EventScheduleField";

export const EventScheduleListField = props => {
  const { form } = props;
  const { values, setValue } = form;
  const { t } = useTranslation('materials');

  const addField = () => {
    setValue('eventSchedules', [...values.eventSchedules, {}]);
  };

  const deleteField = (idx) => () => {
    setValue('eventSchedules', values.eventSchedules.filter((_, _idx) => (_idx !== idx)));
  };

  return (
    <FormGroup className="mt-4">
      <FormGroup>
        <Button
          color="primary"
          onClick={addField}
        >
          {t('addButtonSchedule')}
        </Button>
      </FormGroup>
      {values.eventSchedules.map((value, idx) => (
        <React.Fragment key={idx}>
          {idx !== 0 && (<hr/>)}
          <EventScheduleField
            form={form}
            idx={idx}
            value={value}
            onDelete={deleteField(idx)}
          />
        </React.Fragment>
      ))}
    </FormGroup>
  );
};
