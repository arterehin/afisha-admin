export const mapErrorsToFields = errors => {
  return errors.reduce((acc, error) => {
    acc[error.field ?? error.propertyPath] = error.message;
    return acc;
  }, {});
};