import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import {
  ClientConfigInterface,
  CreatePagePayloadInterface,
  PageApiResponseInterface,
} from './interfaces';
import { getMissingRequiredFieldErrors } from './helpers';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL },
  payload,
}: {
  parameters: ClientConfigInterface;
  payload: CreatePagePayloadInterface;
}): Promise<PageApiResponseInterface> => {
  const error = getMissingRequiredFieldErrors({
    fields: ['apiToken', 'name', 'url'],
    data: {
      apiToken,
      name: payload.name,
      url: payload.url,
    },
  });

  if (error) {
    return {
      error: `${error}.`,
    };
  }

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
