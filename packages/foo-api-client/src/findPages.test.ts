import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
import findPages from './findPages';
import { setMockResponse } from './testHelpers';

jest.mock('node-fetch');

describe('findPages()', () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it('requests the corresponding endpoint correctly', async () => {
    const mockApiResponse = { data: [{ id: '1234' }] };
    setMockResponse(mocked(fetch), mockApiResponse);

    const response = await findPages({
      parameters: {
        apiToken: '123',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/pages',
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

    const response = await findPages({
      parameters: {
        apiToken: '123',
        criteria: 'ascending',
        from: '2021-05-03T21:44:28.317Z',
        limit: 5,
        skip: 2,
        sort: 'createdAt',
        to: '2021-05-04T21:44:28.317Z',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/pages' +
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
