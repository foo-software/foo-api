import fetch from 'node-fetch';
import { LATEST_API_URL } from './constants';
import {
  LighthouseAuditApiResponseInterface,
  ResourceParameters,
  UpdateLighthouseAuditPayloadInterface,
} from './interfaces';

export default async ({
  parameters: { apiToken, apiUrl = LATEST_API_URL, id },
  payload,
}: {
  parameters: ResourceParameters;
  payload: UpdateLighthouseAuditPayloadInterface;
}): Promise<LighthouseAuditApiResponseInterface> => {
  const result = await fetch(`${apiUrl}/lighthouseAudits/${id}`, {
    method: 'put',
    headers: {
      authorization: apiToken,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return result.json();
};
