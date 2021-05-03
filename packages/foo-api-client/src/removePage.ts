import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import { PageApiResponseInterface, ResourceParameters } from './interfaces';
import { getMissingRequiredFieldErrors } from './helpers';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL, id },
}: {
  parameters: ResourceParameters;
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
    method: 'delete',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
  });
  return result.json();
};
