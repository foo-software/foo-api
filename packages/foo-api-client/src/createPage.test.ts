import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
import createPage from './createPage';
import { setMockResponse } from './testHelpers';

jest.mock('node-fetch');

describe('createPage()', () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it('requests the corresponding endpoint correctly', async () => {
    const mockApiResponse = { data: { id: '1234' } };
    setMockResponse(mocked(fetch), mockApiResponse);

    const response = await createPage({
      parameters: {
        apiToken: '123',
      },
      payload: {
        name: 'hello',
        url: 'https://www.foo.software',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/pages',
      {
        body: JSON.stringify({
          name: 'hello',
          url: 'https://www.foo.software',
        }),
        headers: {
          authorization: '123',
          'content-type': 'application/json',
        },
        method: 'post',
      }
    );

    expect(response).toEqual(mockApiResponse);
  });
});
