import _ from "lodash";
import mapTranslations from "./mapTranslations";

const mapFieldsToRequest = ({
  fields = [],
  attributes = [],
  locales = [],
  data = {}
}) => {
  const dataObj = { ...data };
  const { 
    attributes: userAttributes = {}, 
    chain, 
    parent,
    contacts 
  } = dataObj;
  let resultAttributes = [];
  let resultContacts = [];

  if (Object.keys(userAttributes).length > 0) {
    resultAttributes = fields.map((field) => {
      const { "@id": id, slug, isTranslatable } = field;
      const attribute = attributes.find(({ field }) => field === id);

      return {
        ...(attribute ? { id: attribute["@id"] } : {}),
        field: id,
        translations: locales.map((locale) => {
          let value = userAttributes[slug];

          if (isTranslatable) {
            value = _.get(userAttributes, `translations.${locale}.${slug}`);
          }

          return {
            locale,
            value: value || ""
          }
        })
      }
    });
  }

  if (Object.keys(contacts).length > 0) {
    resultContacts = Object.keys(contacts).map((item) => ({
      type: item.toUpperCase(),
      value: contacts[item]
    }));
  }

  if (!chain) {
    delete dataObj.chain;
  }

  if (!parent) {
    delete dataObj.parent;
  }

  return {
    ...mapTranslations(dataObj),
    attributes: resultAttributes,
    contacts: resultContacts
  }
}

export default mapFieldsToRequest;