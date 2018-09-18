import assert from 'assert';
import PerfectSchema from '@perfect-schema/base';
import allowedValuesPlugin from '../src/allowed-values';

describe('Testing Allowed Values Validator', () => {

  PerfectSchema.use(allowedValuesPlugin);

  it('should extend validators', () => {
    const schema = new PerfectSchema({
      foo: {
        type: Number,
        allowedValues: [2, 4, 6]
      },
      bar: Number
    });
    const context = schema.createContext();

    context.validate({ foo: 2, bar: 2 });
    assert.ok( context.isValid() );

    context.validate({ foo: 1, bar: 1 });
    assert.ok( !context.isValid() );
    assert.deepStrictEqual( context.getMessages(), { foo: 'notAllowed' });
  });

  it('should fail if allowedValues is not a function', () => {
    [
      undefined, null, NaN, Infinity, -1, 0, 1,
      '', 'foo', /./, {}, new Date(), () => {}
    ].forEach(allowedValues => assert.throws(() => new PerfectSchema({ foo: { type: String, allowedValues }}) ));
  });

});
