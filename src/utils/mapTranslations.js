const mapTranslations = (data = {}) => {
  return Object.keys(data).reduce((acc, currVal) => {
    let value = data[currVal] !== null ? data[currVal] : "";

    if (currVal === "translations" && !Array.isArray(data[currVal])) {
      value = Object.keys(data.translations).reduce((acc, curVal) => {
        const locale = data.translations[curVal];

        delete locale["@type"];
        delete locale["@id"];
        delete locale["locale"];

        const items = Object.keys(locale).map((item) => ({
          [item]: locale[item] === null ? "" : locale[item],
          locale: curVal
        }));

        return acc.concat(items);
      }, []);
    }

    return {
      ...acc,
      [currVal]: value
    };
  }, {});
}

export default mapTranslations;