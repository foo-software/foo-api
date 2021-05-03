import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
import updatePage from './updatePage';
import { setMockResponse } from './testHelpers';

jest.mock('node-fetch');

describe('updatePage()', () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it('requests the corresponding endpoint correctly', async () => {
    const mockApiResponse = { data: { id: '1234' } };
    setMockResponse(mocked(fetch), mockApiResponse);

    const response = await updatePage({
      parameters: {
        apiToken: '123',
        id: 'abc123',
      },
      payload: {
        name: 'my new name',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/pages/abc123',
      {
        body: JSON.stringify({
          name: 'my new name',
        }),
        headers: {
          authorization: '123',
          'content-type': 'application/json',
        },
        method: 'put',
      }
    );

    expect(response).toEqual(mockApiResponse);
  });
});
