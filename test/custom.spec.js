import assert from 'assert';
import PerfectSchema from '@perfect-schema/base';
import customPlugin from '../src/custom';

describe('Testing Custom Validator', () => {

  PerfectSchema.use(customPlugin);

  it('should extend validators', () => {
    const schema = new PerfectSchema({
      foo: {
        type: String,
        custom(value, options, context) {
          return value !== "ok" ? 'testError' : undefined;
        }
      },
      dummy: Number
    });
    const context = schema.createContext();

    context.validate({ foo: 'ok' });
    assert.ok( context.isValid() );

    context.validate({ foo: 123 });
    assert.ok( !context.isValid() );
    assert.deepStrictEqual( context.getMessages(), { foo: 'invalidType' });

    context.validate({ foo: 'something'})
    assert.ok( !context.isValid() );
    assert.deepStrictEqual( context.getMessages(), { foo: 'testError' });
  });

  it('should fail if custom is not a function', () => {
    [
      undefined, null, NaN, Infinity, -1, 0, 1,
      '', 'foo', /./, {}, [], new Date()
    ].forEach(custom => assert.throws(() => new PerfectSchema({ foo: { type: String, custom }}) ));
  });

});
