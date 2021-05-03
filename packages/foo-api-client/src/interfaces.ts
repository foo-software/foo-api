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

export interface CreatePageQueueItemPayloadInterface {
  tag?: string;
}

type DeviceType = 'desktop' | 'mobile';

export interface FindPageLighthouseAuditsParameters
  extends ResourceParametersBase,
    FindPagesParameters {}

export interface FindPagesParameters
  extends ClientConfigInterface,
    OptionalFindParameters {}

export interface LighthouseAuditInterface {
  createdAt: string;
  device: DeviceType;
  error: string;
  finalScreenshot: string;
  id: string;
  lighthouseVersion: string;
  opportunities: Opportunity[];
  pageId: string;
  queueId: string;
  report: string;
  scoreAccessibility: number;
  scoreBestPractices: number;
  scorePerformance: number;
  scoreProgressiveWebApp: number;
  scoreSeo: number;
  tag: string;
  url: string;
}

export interface LighthouseAuditApiResponseInterface
  extends ApiResponseInterface {
  data?: LighthouseAuditInterface;
}

export interface LighthouseAuditsApiResponseInterface
  extends ApiResponseInterface {
  data?: LighthouseAuditInterface[];
}

export interface Opportunity {
  id: string;
  numericValue: number;
  numericUnit?: 'millisecond' | string;
  rating: 'average' | 'error' | 'fail' | 'pass' | string;
}

export interface OptionalFindParameters {
  criteria?: 'ascending' | 'descending';
  from?: string;
  limit?: number;
  skip?: number;
  sort?: string;
  to?: string;
}

export interface PageInterface {
  accountId: string;
  createdAt: string;
  device: DeviceType;
  id: string;
  name: string;
  url: string;
}

export interface PageApiResponseInterface extends ApiResponseInterface {
  data?: PageInterface;
}

export interface PagesApiResponseInterface extends ApiResponseInterface {
  data?: PageInterface[];
}

export interface QueueItemInterface {
  createdAt: string;
  id: string;
  index: number;
  pageId: string;
  status: 'available' | 'busy';
  tag: string;
  type: string;
  waitSeconds: string;
}

export interface QueueItemApiResponseInterface extends ApiResponseInterface {
  data?: QueueItemInterface;
}

export interface QueueItemsApiResponseInterface extends ApiResponseInterface {
  data?: QueueItemInterface[];
}

export interface ResourceParametersBase {
  id: string;
}

export interface ResourceParameters
  extends ClientConfigInterface,
    ResourceParametersBase {}

export interface UpdateLighthouseAuditPayloadInterface {
  tag?: string;
}

export interface UpdatePagePayloadInterface {
  device?: DeviceType;
  name?: string;
  url?: string;
}
