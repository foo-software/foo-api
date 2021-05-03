import { getMissingRequiredFieldErrors, getQueryString } from './helpers';

describe('helpers', () => {
  describe('getQueryString', () => {
    it('gets a correctly formatted query string', async () => {
      const expected = '?hello=world&foo=bar';
      const actual = getQueryString({
        hello: 'world',
        foo: 'bar',
      });
      expect(expected).toEqual(actual);
    });
  });

  describe('getMissingRequiredFieldErrors', () => {
    it('gets correct error message when required fields are missing', async () => {
      const expected =
        'missing the following required fields: "ipsum", "lorem"';
      const actual = getMissingRequiredFieldErrors({
        data: {
          hello: 'world',
        },
        fields: ['ipsum', 'lorem'],
      });
      expect(expected).toEqual(actual);
    });
  });
});
