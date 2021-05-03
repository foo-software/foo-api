import createPage from './createPage';
import findPages from './findPages';
import {
  ClientConfigInterface,
  CreatePagePayloadInterface,
  OptionalFindParameters,
  PageApiResponseInterface,
  PagesApiResponseInterface,
} from './interfaces';
import { LATEST_API_URL } from './constants';

export default class ApiClient {
  apiToken: string;
  apiUrl?: string;

  constructor({ apiToken, apiUrl = LATEST_API_URL }: ClientConfigInterface) {
    this.apiToken = apiToken;
    this.apiUrl = apiUrl;
  }

  async createPage(
    payload: CreatePagePayloadInterface
  ): Promise<PageApiResponseInterface> {
    return createPage({
      apiToken: this.apiToken,
      apiUrl: this.apiUrl,
      payload,
    });
  }

  async findPages(
    parameters: OptionalFindParameters
  ): Promise<PagesApiResponseInterface> {
    return findPages({
      apiToken: this.apiToken,
      apiUrl: this.apiUrl,
      ...parameters,
    });
  }
}
