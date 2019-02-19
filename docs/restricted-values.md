# Restricted Values Validator

Allow any value, except the one specified for a given field.


## Usage

```js
const schema = new PerfectSchema({
  color: {
    type: String,
    restrictedValues: ['red', 'blue', 'green']
  },
  message: String
});
```


##### Extended schema field options

* **restrictedValues** : `Array`
  The list of restricted values. The field will only validate if it's value
  is strictly equal to none of the specified array item.