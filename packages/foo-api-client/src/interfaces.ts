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

export interface FindPagesParameters
  extends ClientConfigInterface,
    OptionalFindParameters {}

export interface OptionalFindParameters {
  criteria?: 'ascending' | 'descending';
  from?: string;
  limit?: number;
  skip?: number;
  sort?: string;
  to?: string;
}

export interface PageInterface {
  _id: string;
  accountId: string;
  createdAt: string;
  device: 'desktop' | 'mobile';
  name: string;
  url: string;
}
