import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
import updateLighthouseAudit from './updateLighthouseAudit';
import { setMockResponse } from './testHelpers';

jest.mock('node-fetch');

describe('updateLighthouseAudit()', () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it('requests the corresponding endpoint correctly', async () => {
    const mockApiResponse = { data: { id: '1234' } };
    setMockResponse(mocked(fetch), mockApiResponse);

    const response = await updateLighthouseAudit({
      parameters: {
        apiToken: '123',
        id: 'abc123',
      },
      payload: {
        tag: 'hello',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/lighthouseAudits/abc123',
      {
        body: JSON.stringify({
          tag: 'hello',
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
