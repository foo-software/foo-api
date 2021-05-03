import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import {
  FindPageLighthouseAuditsParameters,
  LighthouseAuditsApiResponseInterface,
} from './interfaces';
import { getQueryString } from './helpers';
import { getMissingRequiredFieldErrors } from './helpers';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL, id, ...parameters },
}: {
  parameters: FindPageLighthouseAuditsParameters;
}): Promise<LighthouseAuditsApiResponseInterface> => {
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

  const result = await fetch(
    `${apiUrl}/pages/${id}/lighthouseAudits${getQueryString(parameters)}`,
    {
      method: 'get',
      headers: {
        authorization: apiToken,
        'content-type': 'application/json',
      },
    }
  );
  return result.json();
};
