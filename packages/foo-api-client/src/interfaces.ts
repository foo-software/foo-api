export interface ApiResponseInterface {
  data?: any;
  error?: string;
}

export interface ClientConfigInterface {
  apiToken: string;
  apiUrl?: string;
}

export interface FindPagesApiResponseInterface extends ApiResponseInterface {
  data?: PageInterface;
}

export interface PageInterface {
  _id: string;
  accountId: string;
  createdAt: string;
  device: 'desktop' | 'mobile';
  name: string;
  url: string;
}
