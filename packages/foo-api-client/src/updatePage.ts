import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import {
  PageApiResponseInterface,
  ResourceParameters,
  UpdatePagePayloadInterface,
} from './interfaces';
import { getMissingRequiredFieldErrors } from './helpers';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL, id },
  payload,
}: {
  parameters: ResourceParameters;
  payload: UpdatePagePayloadInterface;
}): Promise<PageApiResponseInterface> => {
  const error = getMissingRequiredFieldErrors({
    fields: ['apiToken', 'id'],
    data: {
      apiToken,
      id,
    },
  });

  if (error) {
    return {
      error: `${error}.`,
    };
  }

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
