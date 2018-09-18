# Allowed Values Validator

Allow only a specified enumeration of values to be valid for a given field.


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
