import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import { ApiResponseInterface, ClientConfigInterface } from './interfaces';

export default async ({
  apiToken,
  apiUrl = LATEST_API_URL,
}: ClientConfigInterface): Promise<ApiResponseInterface> => {
  const result = await fetch(`${apiUrl}/pages`, {
    method: 'get',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
  });
  return result.json();
};
