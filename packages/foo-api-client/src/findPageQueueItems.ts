import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import {
  ResourceParameters,
  QueueItemsApiResponseInterface,
} from './interfaces';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL, id },
}: {
  parameters: ResourceParameters;
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
