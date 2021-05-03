import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import { CreatePageParameters, PageApiResponseInterface } from './interfaces';

export default async ({
  apiToken,
  apiUrl = LATEST_API_URL,
  payload,
}: CreatePageParameters): Promise<PageApiResponseInterface> => {
  const result = await fetch(`${apiUrl}/pages`, {
    method: 'post',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return result.json();
};
