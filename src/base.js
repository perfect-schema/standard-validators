
/**
Wrap the given nextValidator function with pre-validations. If the pre-validation
pass, then nextValidator is called.

@param nextValidator {Function} the validator being wrapped
@param options {Object} the declared definition options
@param field {String}  the field name
@param schema {PerfectSchema} the PerfectSchema instance
@return {Function} a validation function
*/
export default function baseValidationWrapper(nextValidator, options/*, field, schema*/) {
  const { nullable, required } = options;

  if (!nullable) {
    nextValidator = isNull(nextValidator);
  }
  if (required) {
    nextValidator = isRequired(nextValidator);
  } else {
    nextValidator = isUndefined(nextValidator);
  }

  return nextValidator;
};


/**
@param nextValidator {Function}
*/
function isUndefined(nextValidator) {
  /**
  Check if the given value is undefined, or call the next validator otherwise.

  @param value {mixed}
  @return {null|String}
  */
  return function validator(value) {
    return value !== undefined ? nextValidator && nextValidator(value) : null;
  };
};



/**
@param nextValidator {Function}
*/
function isRequired(nextValidator) {
  /**
  Check if the given value is required, otherwise call the
  next validator. If the validation fails, the message 'required'
  is returned.

  @param value {mixed}
  @return {null|String}
  */
  return function validator(value) {
    return value === undefined ? 'required' : nextValidator && nextValidator(value);
  };
};

/**
@param nextValidator {Function}
*/
function isNull(nextValidator) {
  /**
  Check if the given value is null, otherwise call the
  next validator If the validation fails, the message 'noValue'
  is returned.

  @param value {mixed}
  @return {null|String}
  */
  return function validator(value) {
    return value === null ? 'noValue' : nextValidator && nextValidator(value);
  };
};
