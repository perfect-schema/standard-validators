
/**
Wrap the given nextValidator function with string validations. If the validation
pass, then nextValidator is called.

@param nextValidator {Function} the validator being wrapped
@param options {Object} the declared definition options
@param field {String}  the field name
@param schema {PerfectSchema} the PerfectSchema instance
@return {Function} a validation function
*/
export default function stringValidationWrapper(nextValidator, options/*, field, schema*/) {
  const { min, max } = options;

  if (!isNaN(min) && isFinite(min)) {
    nextValidator = isStringTooSmall(min, nextValidator);
  }
  if (!isNaN(max) && isFinite(max)) {
    nextValidator = isStringTooLong(max, nextValidator);
  }

  return isString(nextValidator);
}


/**
@param nextValidator {Function}
*/
function isString(nextValidator) {
  /**
  Make sure the given value is a String.

  @param value {mixed}
  @return {null|String}
  */
  return function validator(value) {
    return (typeof value !== 'string' ? 'invalidType' : nextValidator && nextValidator(value);
  };
};



/**
@param min {Number}
@param nextValidator {Function}
*/
function isStringTooSmall(min, nextValidator) {
  /**
  Make sure the given string is at least min characters long

  @param value {mixed}
  @return {null|String}
  */
  return function validator(value) {
    return value.length < min ? 'minString' : nextValidator && nextValidator(value);
  };
};


/**
@param max {Number}
@param nextValidator {Function}
*/
function isStringTooLong(max, nextValidator) {
  /**
  Make sure the given string is at most max characters long

  @param value {mixed}
  @return {null|String}
  */
  return function validator(value) {
    return value.length > max ? 'maxString' : nextValidator && nextValidator(value);
  };
};
