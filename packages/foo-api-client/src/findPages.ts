import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import { getQueryString } from './helpers';
import { FindPagesParameters, PagesApiResponseInterface } from './interfaces';

export default async ({
  apiToken,
  apiUrl = LATEST_API_URL,
  ...parameters
}: FindPagesParameters): Promise<PagesApiResponseInterface> => {
  const result = await fetch(`${apiUrl}/pages${getQueryString(parameters)}`, {
    method: 'get',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
  });
  return result.json();
};
