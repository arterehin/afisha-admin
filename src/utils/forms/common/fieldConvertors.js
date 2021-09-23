import { formatDateTime } from "../../formats";

export const authorNormalizer = data => {
  const author = data.author;
  data.author = (author && author['@id']) ?? '';
  return Promise.resolve(data);
};

export const publishedAtNormalizer = data => {
  data.publishedAt = formatDateTime(new Date(data?.publishedAt ?? new Date().toString()));
  return Promise.resolve(data);
}

export const extraHtmlNormalizer = data => {
  data.isExtraHtml = !!data.extraHtml
  return Promise.resolve(data);
}

export const eventSchedulesNormalizer = data => {
  const { eventSchedules, ...other } = data;
  other.eventSchedulesList = eventSchedules;
  return Promise.resolve(other);
}