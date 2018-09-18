import assert from 'assert';
import PerfectSchema from '@perfect-schema/base';
import matchPlugin from '../src/match';

describe('Testing Match Validator', () => {

  PerfectSchema.use(matchPlugin);

  it('should extend validators', () => {
    [
      /test/,
      new RegExp('test'),
      'test'
    ].forEach(match => {
      const schema = new PerfectSchema({
        foo: {
          type: String,
          match
        },
        dummy: Number
      });
      const context = schema.createContext();

      context.validate({ foo: 'test' });
      assert.ok( context.isValid() );

      context.validate({ foo: 'invalid' });
      assert.ok( !context.isValid() );
      assert.deepStrictEqual( context.getMessages(), { foo: 'mismatch' });
    });
  });


  it('should fail if custom is not a function', () => {
    [
      undefined, null, NaN, Infinity, -1, 0, 1,
      {}, [], new Date(), () => {}
    ].forEach(match => assert.throws(() => new PerfectSchema({ foo: { type: String, match }}) ));
  });


  it('should match email pattern', () => {

    const pattern = PerfectSchema.MATCH_EMAIL;

    [
      'me@domain.com'
    ].forEach(email => assert.ok( pattern.test(email) ) );

    [
      'foo',
      'foo@domain',
      '@domain.com',
      'domain.com',
      '@domain.com',
      'foo@domain.c'
    ].forEach(email => assert.ok( !pattern.test(email) ) );
  });

});
