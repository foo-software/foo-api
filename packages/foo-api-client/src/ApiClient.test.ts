import ApiClient from './ApiClient';

describe('ApiClient', () => {
  it('throws error when incorrectly instantiated', () => {
    expect(() => new ApiClient({ apiToken: '' })).toThrow(
      'API token is missing.'
    );
  });
});
