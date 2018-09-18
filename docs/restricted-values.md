# Restricted Values Validator

Allow any value, except the one specified for a given field.


## Usage

```js
const schema = new PerfectSchema({
  locale: {
    type: String,
    allowedValues: ['en', 'es', 'fr']
  },
  message: String
});
```
