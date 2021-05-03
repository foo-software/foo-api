import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
import createPageQueueItem from './createPageQueueItem';
import { setMockResponse } from './testHelpers';

jest.mock('node-fetch');

describe('createPageQueueItem()', () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it('requests the corresponding endpoint correctly', async () => {
    const mockApiResponse = { data: { id: '1234' } };
    setMockResponse(mocked(fetch), mockApiResponse);

    const response = await createPageQueueItem({
      parameters: {
        apiToken: '123',
        id: 'abc123',
      },
      payload: {
        tag: 'hello',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/pages/abc123/queueItems',
      {
        body: JSON.stringify({
          tag: 'hello',
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
