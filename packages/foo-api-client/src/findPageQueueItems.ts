import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import { PageParameters, QueueItemsApiResponseInterface } from './interfaces';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL, id },
}: {
  parameters: PageParameters;
}): Promise<QueueItemsApiResponseInterface> => {
  const result = await fetch(`${apiUrl}/pages/${id}/queueItems`, {
    method: 'get',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
  });
  return result.json();
};
