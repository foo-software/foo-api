import createAlert from './createAlert';
import createPage from './createPage';
import createPageQueueItem from './createPageQueueItem';
import findPageLighthouseAudits from './findPageLighthouseAudits';
import findPageQueueItems from './findPageQueueItems';
import findPages from './findPages';
import removeLighthouseAudit from './removeLighthouseAudit';
import removePage from './removePage';
import updateLighthouseAudit from './updateLighthouseAudit';
import updatePage from './updatePage';
import {
  AlertPayloadInterface,
  AlertResponseInterface,
  ClientConfigInterface,
  CreatePagePayloadInterface,
  CreatePageQueueItemPayloadInterface,
  LighthouseAuditApiResponseInterface,
  LighthouseAuditsApiResponseInterface,
  OptionalFindParameters,
  PageApiResponseInterface,
  ResourceParametersBase,
  PagesApiResponseInterface,
  QueueItemApiResponseInterface,
  QueueItemsApiResponseInterface,
  UpdateLighthouseAuditPayloadInterface,
  UpdatePagePayloadInterface,
} from './interfaces';
import { LATEST_API_URL } from './constants';

export default class ApiClient {
  apiToken: string;
  apiUrl?: string;

  constructor({ apiToken, apiUrl = LATEST_API_URL }: ClientConfigInterface) {
    if (!apiToken) {
      throw Error('API token is missing.');
    }

    this.apiToken = apiToken;
    this.apiUrl = apiUrl;
  }

  async createAlert({
    payload,
  }: {
    payload: AlertPayloadInterface;
  }): Promise<AlertResponseInterface> {
    return createAlert({
      parameters: {
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
      payload,
    });
  }

  async createPage({
    payload,
  }: {
    payload: CreatePagePayloadInterface;
  }): Promise<PageApiResponseInterface> {
    return createPage({
      parameters: {
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
      payload,
    });
  }

  async createPageQueueItem({
    parameters,
    payload,
  }: {
    parameters: ResourceParametersBase;
    payload: CreatePageQueueItemPayloadInterface;
  }): Promise<QueueItemApiResponseInterface> {
    return createPageQueueItem({
      parameters: {
        ...parameters,
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
      payload,
    });
  }

  async findPageLighthouseAudits({
    parameters,
  }: {
    parameters: ResourceParametersBase;
  }): Promise<LighthouseAuditsApiResponseInterface> {
    return findPageLighthouseAudits({
      parameters: {
        ...parameters,
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
    });
  }

  async findPageQueueItems({
    parameters,
  }: {
    parameters: ResourceParametersBase;
  }): Promise<QueueItemsApiResponseInterface> {
    return findPageQueueItems({
      parameters: {
        ...parameters,
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
    });
  }

  async findPages({
    parameters,
  }: {
    parameters?: OptionalFindParameters;
  } = {}): Promise<PagesApiResponseInterface> {
    return findPages({
      parameters: {
        ...parameters,
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
    });
  }

  async removeLighthouseAudit({
    parameters,
  }: {
    parameters: ResourceParametersBase;
  }): Promise<LighthouseAuditApiResponseInterface> {
    return removeLighthouseAudit({
      parameters: {
        ...parameters,
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
    });
  }

  async removePage({
    parameters,
  }: {
    parameters: ResourceParametersBase;
  }): Promise<PageApiResponseInterface> {
    return removePage({
      parameters: {
        ...parameters,
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
    });
  }

  async updateLighthouseAudit({
    parameters,
    payload,
  }: {
    parameters: ResourceParametersBase;
    payload: UpdateLighthouseAuditPayloadInterface;
  }): Promise<LighthouseAuditApiResponseInterface> {
    return updateLighthouseAudit({
      parameters: {
        ...parameters,
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
      payload,
    });
  }

  async updatePage({
    parameters,
    payload,
  }: {
    parameters: ResourceParametersBase;
    payload: UpdatePagePayloadInterface;
  }): Promise<PageApiResponseInterface> {
    return updatePage({
      parameters: {
        ...parameters,
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
      payload,
    });
  }
}
