import format from 'date-fns/format';
import isValid from 'date-fns/isValid';

export const formatDate = (date) => (isValid(date) ? format(date, 'yyyy-MM-dd') : '');

export const formatTime = (date) => (isValid(date) ? format(date, 'HH:mm') : '');

export const formatDateTime = (date) => (`${formatDate(date)}T${formatTime(date)}`);
