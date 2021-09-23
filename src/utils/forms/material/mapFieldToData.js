import { eventSchedulesNormalizer } from "../common/fieldConvertors";

export const mapFieldToData = data => {
  return Promise.resolve(data)
    .then(eventSchedulesNormalizer);
};
