import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
import removeLighthouseAudit from './removeLighthouseAudit';
import { setMockResponse } from './testHelpers';

jest.mock('node-fetch');

describe('removeLighthouseAudit()', () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it('requests the corresponding endpoint correctly', async () => {
    const mockApiResponse = { data: { id: '1234' } };
    setMockResponse(mocked(fetch), mockApiResponse);

    const response = await removeLighthouseAudit({
      parameters: {
        apiToken: '123',
        id: 'abc123',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/lighthouseAudits/abc123',
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
