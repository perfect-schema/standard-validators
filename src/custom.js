

function customValidator(schema) {
  schema.fieldNames.forEach(fieldName => {
    const field = schema.fields[fieldName];

    if ('custom' in field) {
      if (typeof field.custom !== 'function') {
        throw new TypeError('Custom validation should be function');
      }

      const custom = field.custom.bind(schema);
      const validator = field.validator;

      delete field.custom;

      field.validator = (value, self, context) => validator(value, self, context) || custom(value, self, context);
    }

  });
}


export default () => customValidator;
