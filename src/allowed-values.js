

function allowedValuesValidator(schema) {
  schema.fieldNames.forEach(fieldName => {
    const field = schema.fields[fieldName];

    if ('allowedValues' in field) {
      if (!Array.isArray(field.allowedValues)) {
        throw new TypeError('Allowed values should be an array');
      }

      const allowedValues = field.allowedValues;
      const validator = field.validator;

      field.validator = (value, self, context) => {
        const allowed = allowedValues.some(allowedValue => allowedValue === value);

        return !allowed ? 'notAllowed' : validator(value, self, context);
      };
    }

  });
}


export default () => allowedValuesValidator;
