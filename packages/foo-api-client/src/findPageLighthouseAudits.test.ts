import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
import findPageLighthouseAudits from './findPageLighthouseAudits';
import { setMockResponse } from './testHelpers';

jest.mock('node-fetch');

describe('findPageLighthouseAudits()', () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it('requests the corresponding endpoint correctly', async () => {
    const mockApiResponse = { data: [{ id: '1234' }] };
    setMockResponse(mocked(fetch), mockApiResponse);

    const response = await findPageLighthouseAudits({
      parameters: {
        apiToken: '123',
        id: 'abc123',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/pages/abc123/lighthouseAudits',
      {
        headers: {
          authorization: '123',
          'content-type': 'application/json',
        },
        method: 'get',
      }
    );

    expect(response).toEqual(mockApiResponse);
  });

  it('requests the corresponding endpoint correctly with optional parameters', async () => {
    const mockApiResponse = { data: [{ id: '1234' }] };
    setMockResponse(mocked(fetch), mockApiResponse);

    const response = await findPageLighthouseAudits({
      parameters: {
        apiToken: '123',
        id: 'abc123',
        criteria: 'ascending',
        from: '2021-05-03T21:44:28.317Z',
        limit: 5,
        skip: 2,
        sort: 'createdAt',
        to: '2021-05-04T21:44:28.317Z',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/pages/abc123/lighthouseAudits' +
        '?criteria=ascending' +
        `&from=${encodeURIComponent('2021-05-03T21:44:28.317Z')}` +
        '&limit=5' +
        '&skip=2' +
        '&sort=createdAt' +
        `&to=${encodeURIComponent('2021-05-04T21:44:28.317Z')}`,
      {
        headers: {
          authorization: '123',
          'content-type': 'application/json',
        },
        method: 'get',
      }
    );

    expect(response).toEqual(mockApiResponse);
  });
});
