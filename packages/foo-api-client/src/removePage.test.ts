import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
import removePage from './removePage';
import { setMockResponse } from './testHelpers';

jest.mock('node-fetch');

describe('removePage()', () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it('requests the corresponding endpoint correctly', async () => {
    const mockApiResponse = { data: { id: '1234' } };
    setMockResponse(mocked(fetch), mockApiResponse);

    const response = await removePage({
      parameters: {
        apiToken: '123',
        id: 'abc123',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/pages/abc123',
      {
        headers: {
          authorization: '123',
          'content-type': 'application/json',
        },
        method: 'delete',
      }
    );

    expect(response).toEqual(mockApiResponse);
  });
});
