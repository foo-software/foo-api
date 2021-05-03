import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import {
  CreatePageQueueItemPayloadInterface,
  ResourceParameters,
  QueueItemApiResponseInterface,
} from './interfaces';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL, id },
  payload,
}: {
  parameters: ResourceParameters;
  payload: CreatePageQueueItemPayloadInterface;
}): Promise<QueueItemApiResponseInterface> => {
  const result = await fetch(`${apiUrl}/pages/${id}/queueItems`, {
    method: 'post',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return result.json();
};
