const mapAttributes = (fields = [], attributes = []) => {
  return attributes.reduce((acc, { field, value, translations }) => {
    const { slug, isTranslatable } = fields.find(({ "@id": id }) => id === field);

    if(isTranslatable && translations) {
      return {
        ...acc,
        translations: Object.keys(translations).reduce((obj, locale) => {
          return {
            ...obj,
            [locale]: {
              ...(obj[locale] ? obj[locale] : {}),
              [slug]: value || ""
            }
          }
        }, acc.translations || {})
      };
    }

    return {
      ...acc,
      [slug]: value || ""
    };
  }, {});
}

export default mapAttributes;