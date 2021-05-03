import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import {
  ClientConfigInterface,
  CreatePagePayloadInterface,
  PageApiResponseInterface,
} from './interfaces';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL },
  payload,
}: {
  parameters: ClientConfigInterface;
  payload: CreatePagePayloadInterface;
}): Promise<PageApiResponseInterface> => {
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
