import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import {
  PageApiResponseInterface,
  PageParameters,
  UpdatePagePayloadInterface,
} from './interfaces';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL, id },
  payload,
}: {
  parameters: PageParameters;
  payload: UpdatePagePayloadInterface;
}): Promise<PageApiResponseInterface> => {
  const result = await fetch(`${apiUrl}/pages/${id}`, {
    method: 'put',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return result.json();
};
