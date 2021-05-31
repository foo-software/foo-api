import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';
import createAlert from './createAlert';
import { setMockResponse } from './testHelpers';

jest.mock('node-fetch');

describe('createPage()', () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it('requests the corresponding endpoint correctly', async () => {
    const mockApiResponse = {
      data: {
        dynamicTemplateData: {
          hello: 'world',
          foo: 'foo',
        },
        templateId: '1234',
        to: 'notifications@foo.software',
      },
    };
    setMockResponse(mocked(fetch), mockApiResponse);

    const response = await createAlert({
      parameters: {
        apiToken: '123',
      },
      payload: {
        dynamicTemplateData: {
          hello: 'world',
          foo: 'foo',
        },
        templateId: '1234',
      },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.foo.software/api/v2/alerts',
      {
        body: JSON.stringify({
          dynamicTemplateData: {
            hello: 'world',
            foo: 'foo',
          },
          templateId: '1234',
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
