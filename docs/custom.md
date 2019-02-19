# Custom Validator

Sometimes, certain fields require custom validations that are too specialized
to generalize in a standard validator. For this purpose, a custom function may
be provided in order to manually process the field's value.

## Usage

```js
const schema = new PerfectSchema({
  password: {
    type: String,
    custom(value, self, context) {
      const field = self.getField('confirmPassword');

      return !field.exists || (field.value !== value) ? 'mismatch' : undefined;
    }
  },
  confirmPassword: {
    type: String
  }
});
```

## Custom validators

The custom validator function receives three (3) arguments and is expected to return
`undefined` or a `String`, whether the field is valid or not. If the field value is
not valid, the returned value is the error message to set in the validator.

The arguments represents the `value`, the field's `self` information, and the actual
validation `context`.

The field's `self` information is an object providing extra functionality when validating
the value.

* **self.fieldName** : `String`
  The field name being validated (not canonized).

* **self.options** : `Object`
  An object having all the options provided to the validation method of the context.

* **self.getField(fieldName)** : `Object`
  Get the current model's field. Useful when validating against other fields. The
  return value will specify if the given field `exists` on the model, and the actual
  `value` from the model (or `undefined` otherwise).

  The argument `fieldName` may contain dots, which will make the function drill down
  into the model.


##### Extended schema field options

* **custom** : `function`
  The custom function. The field value will be validated against the specified
  function. The validation function should return `undefined` if the value is
  valid, or a string representing the error message.

  * :small_blue_diamond: **value** : `mixed`
    The value to validate.

  * :small_blue_diamond: **self** : `object`
    The current model's field information and validation options.

  * :small_blue_diamond: **context** : `ValidationContext`
    The [validation context](https://perfect-schema.github.io/perfect-schema/docs/api.html).