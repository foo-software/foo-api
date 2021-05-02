import findPages from './findPages';
import { ApiResponseInterface, ClientConfigInterface } from './interfaces';
import { LATEST_API_URL } from './constants';

export default class ApiClient {
  apiToken: string;
  apiUrl?: string;

  constructor({ apiToken, apiUrl = LATEST_API_URL }: ClientConfigInterface) {
    this.apiToken = apiToken;
    this.apiUrl = apiUrl;
  }

  async findPages(): Promise<ApiResponseInterface> {
    return findPages({
      apiToken: this.apiToken,
      apiUrl: this.apiUrl,
    });
  }
}
