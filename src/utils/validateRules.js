const requiredRule = value => {
  if (!value) {
    return "form.required";
  }
};

export const validationRules = {
  required: requiredRule
}