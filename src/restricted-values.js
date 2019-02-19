

export default () => schema => {
  schema.fieldNames.forEach(fieldName => {
    const field = schema.fields[fieldName];

    if ('restrictedValues' in field) {
      if (!Array.isArray(field.restrictedValues)) {
        throw new TypeError('Restricted values should be an array');
      }

      const restrictedValues = field.restrictedValues;
      const validator = field.validator;

      field.validator = (value, self, context) => {
        const restricted = restrictedValues.some(restrictedValue => restrictedValue === value);

        return restricted ? 'restricted' : validator(value, self, context);
      };
    }

  });
};