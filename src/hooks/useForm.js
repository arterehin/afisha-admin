import {
  useState,
  useCallback,
  useRef
} from "react";

import { mapTranslations } from "@utils";

const useForm = (initial) => {
  const formRef = useRef(null);
  const [state, setState] = useState(mapTranslations(initial));

  const onChange = useCallback((e) => {
    const { name, value } = e.target || e;

    setState({
      ...state,
      [name]: value
    });
  }, [state]);

  const transformState = useCallback((state) => {
    setState(mapTranslations(state));
  }, []);

  const isRequired = useCallback(({ activeTab, locale }) => {
    return activeTab === `lang-${locale}`;
  }, []);

  const getTranslation = useCallback(({ field, locale }) => {
    let item;

    if (state && Array.isArray(state.translations)) {
      item = state.translations.find((item) => {
        return item.locale === locale && item.hasOwnProperty(field);
      });
    }

    return item ? item[field] : "";
  }, [state]);

  const setTranslation = useCallback((e) => {
    const { name: originalName, value } = e.target;
    const [name, locale] = originalName.match(/[a-z0-9_]+|(?=\[\])/gi);
    const { translations = [] } = state;

    setState({
      ...state,
      translations: translations.reduce((acc, curVal) => {
        if (curVal.locale === locale && curVal.hasOwnProperty(name)) {
          return acc;
        }
        return [
          ...acc,
          curVal
        ]
      }, value ? [{ locale, [name]: value }] : [])
    });
  }, [state]);

  const reset = useCallback(() => {
    setState(initial);
    formRef.current.reset();
  }, [initial]);

  return {
    state,
    setState,
    onChange,
    reset,
    transformState,
    setTranslation,
    getTranslation,
    isRequired,
    formRef
  };
}

export default useForm;