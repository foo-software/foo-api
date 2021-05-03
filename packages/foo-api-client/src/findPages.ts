import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import { getQueryString } from './helpers';
import { FindPagesParameters, PagesApiResponseInterface } from './interfaces';
import { getMissingRequiredFieldErrors } from './helpers';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL, ...parameters },
}: {
  parameters: FindPagesParameters;
}): Promise<PagesApiResponseInterface> => {
  const error = getMissingRequiredFieldErrors({
    fields: ['apiToken'],
    data: {
      apiToken,
    },
  });

  if (error) {
    return {
      error: `${error}.`,
    };
  }

  const result = await fetch(`${apiUrl}/pages${getQueryString(parameters)}`, {
    method: 'get',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
  });
  return result.json();
};
