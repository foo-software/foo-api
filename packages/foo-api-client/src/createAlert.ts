import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import {
  AlertPayloadInterface,
  AlertResponseInterface,
  ClientConfigInterface,
} from './interfaces';
import { getMissingRequiredFieldErrors } from './helpers';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL },
  payload,
}: {
  parameters: ClientConfigInterface;
  payload: AlertPayloadInterface;
}): Promise<AlertResponseInterface> => {
  const error = getMissingRequiredFieldErrors({
    fields: ['apiToken', 'dynamicTemplateData', 'templateId'],
    data: {
      apiToken,
      dynamicTemplateData: payload.dynamicTemplateData,
      templateId: payload.templateId,
    },
  });

  if (error) {
    return {
      error: `${error}.`,
    };
  }

  const result = await fetch(`${apiUrl}/alerts`, {
    method: 'post',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return result.json();
};
