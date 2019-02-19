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


##### Extended schema field options

* **allowedValues** : `Array`
  The list of allowed values. The field will only validate if it's value
  is strictly equal to one of the specified array item.