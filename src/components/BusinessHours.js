import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import TimePicker from "rc-time-picker";

import { Button } from "reactstrap";

import "rc-time-picker/assets/index.css";

const weekdays = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  7: "sunday"
};

const defaultSchedule = {
  open: "08:00",
  close: "17:00",
  break_start: "13:00",
  break_end: "14:00"
};

const BusinessHoursRange = ({ 
  onChange, 
  start, 
  end,
  disabled 
}) => {
  return (
    <div className="business-hours-range">
      <TimePicker
        showSecond={false}
        value={moment(start, "HH:mm")}
        popupClassName="business-hours-range__tooltip"
        onChange={(value) => onChange([
          value.format("HH:mm"),
          end
        ])}
        disabled={disabled}
      />
      <span className="business-hours-range__label">по</span>
      <TimePicker
        showSecond={false}
        value={moment(end, "HH:mm")}
        popupClassName="business-hours-range__tooltip"
        onChange={(value) => onChange([
          start,
          value.format("HH:mm")
        ])}
        disabled={disabled}
      />
    </div>
  );
}

const BusinessHours = ({ 
  state = {}, 
  onChange,
  disabled
}) => {
  const { t } = useTranslation();

  const toggleDay = (e, day) => {
    e.preventDefault();

    if (state[day]) {
      const newState = { ...state };

      delete newState[day];
      onChange && onChange(newState);
    } else {
      onChange && onChange({
        ...state,
        [day]: defaultSchedule
      })
    }
  }

  const handleChange = (e) => {
    const { type, day, range } = e;
    let newState;

    switch (type) {
      case "hours":
        newState = {
          ...state,
          [day]: {
            ...state[day],
            open: range[0],
            close: range[1],
          }
        }
        break;
      case "breaks":
        newState = {
          ...state,
          [day]: {
            ...state[day],
            break_start: range[0],
            break_end: range[1],
          }
        }
        break;
      default:
        newState = state;
    }

    onChange && onChange(newState)
  }

  return (
    <div>
      {Object.keys(weekdays).map((day) => (
        <Button
          key={day}
          color="primary"
          className="btn-pill mr-1 mb-1"
          onClick={(e) => toggleDay(e, day)}
          disabled={disabled}
          {...(state[day] ? {} : { outline: true })}
        >
          {t(`schedule.short.${weekdays[day]}`)}
        </Button>
      ))}
      {Object.keys(state).map((item) => {
        return (
          <div
            key={item}
            className="business-hours-range__weekday"
          >
            <span className="business-hours-range__day-label">
              {t(`schedule.long.${weekdays[item]}`)}
            </span>
            <div className="business-hours-range__hours">
              <div className="business-hours-range__hours-column">
                <span className="business-hours-range__hours-label">Рабочие часы</span>
                <BusinessHoursRange
                  onChange={(range) => handleChange({
                    type: "hours",
                    day: item,
                    range
                  })}
                  start={state[item].open || defaultSchedule.open}
                  end={state[item].close || defaultSchedule.close}
                  disabled={disabled}
                />
              </div>
              <div className="business-hours-range__hours-column">
                <span className="business-hours-range__hours-label">Обед</span>
                <BusinessHoursRange
                  onChange={(range) => handleChange({
                    type: "breaks",
                    day: item,
                    range
                  })}
                  start={state[item].break_start || defaultSchedule.break_start}
                  end={state[item].break_end || defaultSchedule.break_end}
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessHours;