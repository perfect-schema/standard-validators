

function matchValidator(schema) {
  schema.fieldNames.forEach(fieldName => {
    const field = schema.fields[fieldName];

    if ('match' in field) {
      if (typeof field.match === 'string') {
        field.match = new RegExp(field.match, field.matchOptions || '');
      } else if (!(field.match instanceof RegExp)) {
        throw new TypeError('Match is not a pattern');
      }

      const match = field.match;
      const validator = field.validator;

      field.validator = (value, self, context) => {
        const matched = value && match.test(value);

        return !matched ? 'mismatch' : validator(value, self, context);
      };
    }

  });
}


export default PerfectSchema => {

  PerfectSchema.MATCH_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return matchValidator;
};
