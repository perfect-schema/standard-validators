# Match Pattern Validator

This validator allow a string value to be validated against a given pattern.
For example, if the value must an e-mail address, this validator can test
for this without needing to manually implement it.


## Usage

```js
const schema = new PerfectSchema({
  password: {
    type: String,
    // password should only contain certain characters
    match: /[a-z0-9!*$%]/i,
    min: 6,
    max: 20
  }
});
```
