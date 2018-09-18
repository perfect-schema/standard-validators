import assert from 'assert';
import PerfectSchema from '@perfect-schema/base';
import restrictedValuesPlugin from '../src/restricted-values';

describe('Testing Restricted Values Validator', () => {

  PerfectSchema.use(restrictedValuesPlugin);

  it('should extend validators', () => {
    const schema = new PerfectSchema({
      foo: {
        type: Number,
        restrictedValues: [2, 4, 6]
      },
      bar: Number
    });
    const context = schema.createContext();

    context.validate({ foo: 1, bar: 1 });
    assert.ok( context.isValid() );

    context.validate({ foo: 2, bar: 2 });
    assert.ok( !context.isValid() );
    assert.deepStrictEqual( context.getMessages(), { foo: 'restricted' });
  });

  it('should fail if restrictedValues is not a function', () => {
    [
      undefined, null, NaN, Infinity, -1, 0, 1,
      '', 'foo', /./, {}, new Date(), () => {}
    ].forEach(restrictedValues => assert.throws(() => new PerfectSchema({ foo: { type: String, restrictedValues }}) ));
  });

});
