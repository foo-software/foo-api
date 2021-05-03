import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import { PageApiResponseInterface, UpdatePageParameters } from './interfaces';

export default async ({
  apiToken,
  apiUrl = LATEST_API_URL,
  payload,
}: UpdatePageParameters): Promise<PageApiResponseInterface> => {
  const result = await fetch(`${apiUrl}/pages`, {
    method: 'put',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return result.json();
};
