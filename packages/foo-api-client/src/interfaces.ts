export interface ApiResponseInterface {
  data?: any;
  error?: string;
}

export interface ClientConfigInterface {
  apiToken: string;
  apiUrl?: string;
}

export interface CreatePagePayloadInterface {
  device?: DeviceType;
  name: string;
  url: string;
}

export interface CreatePageParameters extends ClientConfigInterface {
  payload: CreatePagePayloadInterface;
}

type DeviceType = 'desktop' | 'mobile';

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
  device: DeviceType;
  name: string;
  url: string;
}

export interface PageApiResponseInterface extends ApiResponseInterface {
  data?: PageInterface;
}

export interface PagesApiResponseInterface extends ApiResponseInterface {
  data?: PageInterface[];
}

export interface UpdatePagePayloadInterface {
  device?: DeviceType;
  name?: string;
  url?: string;
}

export interface UpdatePageParameters extends ClientConfigInterface {
  payload: UpdatePagePayloadInterface;
}
