import { authorNormalizer } from "../common/fieldConvertors";
import { publishedAtNormalizer } from "../common/fieldConvertors";
import { extraHtmlNormalizer } from "../common/fieldConvertors";

export const mapDataToField = data => {
  return Promise.resolve(data)
    .then(authorNormalizer)
    .then(publishedAtNormalizer)
    .then(extraHtmlNormalizer);
};