import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import { ClientConfigInterface, PageApiResponseInterface } from './interfaces';

export default async ({
  apiToken,
  apiUrl = LATEST_API_URL,
}: ClientConfigInterface): Promise<PageApiResponseInterface> => {
  const result = await fetch(`${apiUrl}/pages`, {
    method: 'delete',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
  });
  return result.json();
};
