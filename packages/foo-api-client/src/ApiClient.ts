import createPage from './createPage';
import createPageQueueItem from './createPageQueueItem';
import findPageQueueItems from './findPageQueueItems';
import findPages from './findPages';
import removePage from './removePage';
import updatePage from './updatePage';
import {
  ClientConfigInterface,
  CreatePagePayloadInterface,
  CreatePageQueueItemPayloadInterface,
  OptionalFindParameters,
  PageApiResponseInterface,
  PageParametersBase,
  PagesApiResponseInterface,
  QueueItemApiResponseInterface,
  QueueItemsApiResponseInterface,
  UpdatePagePayloadInterface,
} from './interfaces';
import { LATEST_API_URL } from './constants';

export default class ApiClient {
  apiToken: string;
  apiUrl?: string;

  constructor({ apiToken, apiUrl = LATEST_API_URL }: ClientConfigInterface) {
    this.apiToken = apiToken;
    this.apiUrl = apiUrl;
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
    parameters: PageParametersBase;
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

  async findPageQueueItems({
    parameters,
  }: {
    parameters: PageParametersBase;
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
    parameters: OptionalFindParameters;
  }): Promise<PagesApiResponseInterface> {
    return findPages({
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
    parameters: PageParametersBase;
  }): Promise<PageApiResponseInterface> {
    return removePage({
      parameters: {
        ...parameters,
        apiToken: this.apiToken,
        apiUrl: this.apiUrl,
      },
    });
  }

  async updatePage({
    parameters,
    payload,
  }: {
    parameters: PageParametersBase;
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
