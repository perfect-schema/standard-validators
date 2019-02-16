# Perfect Schema Standard Validatiors Plugin

Provide standard validation for schemas.


## Install

```
npm i -S @perfect-schema/standard-validators
```


## Usage

```js
import PerfectSchema from '@perfect-schema/base';
import { 
  matchValidator,
  restrictedValuesValidator
} from '@perfect-schema/standard-validators';


PerfectSchema.use(matchValidator);
PerfectSchema.use(restrictedValuesValidator);

const schema = new PerfectSchema({
  foo: {
    type: String,
    match: /[a-z0-9]+/i
  },
  bar: {
    type: Number,
    restrictedValues: [2, 3, 5, 7, 11, 13, 17, 19]
  }
});
```


## Documentation

* [Perfect Schema Documentation](https://perfect-schema.github.io/perfect-schema/)
* Standard validators
  * [Allowed Values](https://perfect-schema.github.io/standard-validators/docs/allowed-values.html)
  * [Custom validation](https://perfect-schema.github.io/standard-validators/docs/custom.html)
  * [Match Pattern](https://perfect-schema.github.io/standard-validators/docs/match.html)
  * [Restricted Values](https://perfect-schema.github.io/standard-validators/docs/restricted-values.html)


## license

MIT
