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
      const field = self.getSibling('confirmPassword');

      return !field.exists || (field.value !== value) ? 'mismatch' : undefined;
    }
  },
  confirmPassword: {
    type: String
  }
});
```
