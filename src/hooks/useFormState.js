import { useState, useCallback } from "react";
import _ from "lodash";

const useFormState = (initial) => {
  const [rules, setRule] = useState({});
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(null);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    const rule = rules[name];

    if(rule && typeof rule === "function") {
      const error = _.get(errors, name);

      if(error) {
        const value = _.get(values, name);
        const result = rule(value);
  
        if(typeof result === "undefined") {
          setErrors((state) => _.set({...state}, name, ""));
        }
      }
    }
  }, [errors, values, rules]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setValues((state) => _.set({...state}, name, value));
  }, []);

  const setValue = useCallback((name, value) => {
    setValues((state) => _.set({...state}, name, value));
  }, []);

  const validate = useCallback((schema = {}) => {
    const _errors = {};
    const _schema = {
      ...rules,
      ...schema
    }

    Object.keys(_schema).forEach((item) => {
      if(typeof _schema[item] === "function") {
        const value = _.get(values, item);
        const result = _schema[item](value);

        if(typeof result !== "undefined") {
          _.set(_errors, item, result);
        }
      }
    });

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }, [rules, values]);

  const registerRule = useCallback((rule) => {
    setRule((state) => ({
      ...state,
      ...rule
    }))
  }, [setRule]);

  const getError = useCallback((name) => {
    return _.get(errors, name);
  }, [errors]);

  const getValue = useCallback((name) => {
    return _.get(values, name) || "";
  }, [values]);

  const reset = useCallback(() => {
    setValues(initial);
    setErrors(null);
  }, [initial]);

  return {
    values,
    errors,
    setErrors,
    setValue,
    setValues,
    registerRule,
    handleChange,
    handleBlur,
    validate,
    getError,
    getValue,
    reset
  };
}

export default useFormState;