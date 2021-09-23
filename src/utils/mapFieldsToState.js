const mapFieldsToState = (fields = [], locales = []) => {
  return fields.reduce((fieldOut, field) => {
    const { isTranslatable, slug, defaultValue } = field;
    const isNull = defaultValue === null;

    if (isTranslatable) {
      return {
        ...fieldOut,
        translations: locales.reduce((transOut, locale) => {
          return {
            ...transOut,
            [locale]: {
              ...(transOut[locale] ? transOut[locale] : {}),
              [slug]: isNull ? "" : defaultValue
            }
          }
        }, fieldOut.translations || {})
      };
    }

    return {
      ...fieldOut,
      [slug]: isNull ? "" : defaultValue
    };
  }, {});
}

export default mapFieldsToState;