---
sidebar_position: 1
title: Documentation of Foo's API endpoints for its page experience testing services
description: Documentation of Foo's API endpoints for its page experience testing services. Foo provides testing and monitoring services using Lighthouse and Web Vitals.
---

# Endpoints

Foo exposes a public REST API for management of pages on to be audited by Lighthouse. Before proceeding you may want to first read the below sections.

- [API Response](/docs/api/api-response)
- [Authentication](/docs/api/authentication)
- [Parameters](/docs/api/parameters)
- [Resources](/docs/api/resources)
- [REST Methods](/docs/api/rest-methods)

## Page Endpoints

Below are endpoints for managing [`Page` resources](/docs/api/resources#page).

### `findPages`

```
GET https://www.foo.software/api/v2/pages
```

Returns a collection of pages belonging to the authenticated account.

#### `findPages` Parameters

Supports all [common optional parameters](/docs/api/parameters) as query parameters.

#### `findPages` Example Response

```json
{
  "data": [
    {
      "url": "https://www.foo.software/lighthouse",
      "createdAt": "2020-09-06T17:50:00.127Z",
      "device": "mobile",
      "name": "Lighthouse Page",
      "id": "5f55214823d9f90038cb2d7b"
    },
    {
      "name": "Web Vitals Page",
      "device": "mobile",
      "id": "5f55201023d9f90038cb2d74",
      "createdAt": "2020-09-06T17:44:48.862Z",
      "url": "https://www.foo.software/web-vitals/"
    }
  ]
}
```

### `createPage`

```
POST https://www.foo.software/api/v2/pages
```

Creates a new page belonging to the authenticated account.

#### `createPage` Payload

The below fields should populate the [request body as documented](/docs/api/rest-methods#post). For details about what each field means, see [`Page` resource documentation](/docs/api/resources#page).

```typescript
interface Payload {
  device?: 'desktop' | 'mobile';
  name: string;
  url: string;
}
```

#### `createPage` Example Response

```json
{
  "data": {
    "url": "https://www.foo.software/lighthouse",
    "createdAt": "2020-09-06T17:50:00.127Z",
    "device": "mobile",
    "name": "Lighthouse Page",
    "id": "5f55214823d9f90038cb2d7b"
  }
}
```

### `updatePage`

```
PUT https://www.foo.software/api/v2/pages/:id
```

Updates a page by `id` belonging to the authenticated account.

#### `updatePage` Parameters

The below parameters are "path" parameters.

```typescript
interface Parameters {
  id: string;
}
```

#### `updatePage` Payload

The below fields should populate the [request body as documented](/docs/api/rest-methods#put). For details about what each field means, see [`Page` resource documentation](/docs/api/resources#page).

```typescript
interface Payload {
  device?: 'desktop' | 'mobile';
  name?: string;
  url?: string;
}
```

#### `updatePage` Example Response

```json
{
  "data": {
    "url": "https://www.foo.software/lighthouse",
    "createdAt": "2020-09-06T17:50:00.127Z",
    "device": "mobile",
    "name": "Lighthouse Page (updated)",
    "id": "5f55214823d9f90038cb2d7b"
  }
}
```

### `removePage`

```
DELETE https://www.foo.software/api/v2/pages/:id
```

Removes a page by `id` belonging to the authenticated account.

#### `removePage` Parameters

The below parameters are "path" parameters.

```typescript
interface Parameters {
  id: string;
}
```

#### `removePage` Example Response

Note: the below response represents the page that was deleted.

```json
{
  "data": {
    "url": "https://www.foo.software/lighthouse",
    "createdAt": "2020-09-06T17:50:00.127Z",
    "device": "mobile",
    "name": "Lighthouse Page (updated)",
    "id": "5f55214823d9f90038cb2d7b"
  }
}
```

## Queue Endpoints

Below are endpoints for managing [`QueueItem` resources](/docs/api/resources#queueitem).

### `findPageQueueItems`

```
GET https://www.foo.software/api/v2/pages/:id/queueItems
```

Returns all queue items for a page (by page `id`) belonging to the authenticated account.

#### `findPageQueueItems` Parameters

The below parameters are "path" parameters. `id` is for the page.

```typescript
interface Parameters {
  id: string;
}
```

Note: this endpoint does not support [common optional parameters](/docs/api/parameters) as it returns data from an ephemeral storage and will never return large amounts of data to justify sorting, paginating, etc.

#### `findPageQueueItems` Example Response

```json
{
  "data": [
    {
      "createdAt": "2021-05-04T21:15:10.499Z",
      "id": "1620162910499-5aad2db2-1ad3-4556-b043-987e6fccf423",
      "index": 0,
      "pageId": "608ef83194f4a905853256f3",
      "tag": "PR #1",
      "type": "lighthouseAudit",
      "waitSeconds": 30
    },
    {
      "createdAt": "2021-05-04T21:15:10.499Z",
      "id": "1620162936866-8cec2bd7-5d69-40c8-a0b8-a5cc33ba16a3",
      "index": 1,
      "pageId": "608ef83194f4a905853256f3",
      "tag": "PR #2",
      "type": "lighthouseAudit",
      "waitSeconds": 40
    }
  ]
}
```

### `createPageQueueItem`

```
POST https://www.foo.software/api/v2/pages/:id/queueItems
```

Adds a new item to the queue for a page (by page `id`) belonging to the authenticated account.

#### `createPageQueueItem` Parameters

The below parameters are "path" parameters.

```typescript
interface Parameters {
  id: string;
}
```

#### `createPageQueueItem` Payload

The below fields should populate the [request body as documented](/docs/api/rest-methods#post). For details about what each field means, see [`QueuItem` resource documentation](/docs/api/resources#queueitem).

```typescript
interface Payload {
  tag?: string;
}
```

#### `createPageQueueItem` Example Response

Note the `index` and `waitSeconds` fields are calculated after creation and are therefore not available in the `createPageQueueItem` response.
  
```json
{
  "data": {
    "createdAt": "2021-05-04T21:15:36.866Z",
    "id": "1620162936866-8cec2bd7-5d69-40c8-a0b8-a5cc33ba16a3",
    "pageId": "608ef83194f4a905853256f3",
    "status": "available",
    "tag": "PR #2",
    "type": "lighthouseAudit"
  }
}
```

## Lighthouse Audit Endpoints

Below are endpoints for managing [`LighthouseAudit` resources](/docs/api/resources#lighthouseaudit).

### `findPageLighthouseAudits`

```
GET https://www.foo.software/api/v2/pages/:id/lighthouseAudits
```

Returns a collection of Lighthouse audits for a page (by page `id`) belonging to the authenticated account.

#### `findPageLighthouseAudits` Parameters

Supports all [common optional parameters](/docs/api/parameters) as query parameters. The below parameters are "path" parameters. `id` is for the page.

```typescript
interface Parameters {
  id: string;
}
```

#### `findPageLighthouseAudits` Example Response

```json
{
  "data": [
    {
      "createdAt": "2021-05-04T20:38:14.216Z",
      "finalScreenshot": "https://foo-software-lighthouse-reports-dev.s3.amazonaws.com/final-screenshot-1620160694001.jpg",
      "id": "6091b0b6fe6f77002f230306",
      "lighthouseVersion": "7.3.0",
      "opportunities": [
        {
          "id": "uses-webp-images",
          "numericUnit": "millisecond",
          "numericValue": 9230,
          "rating": "fail"
        },
        {
          "id": "uses-responsive-images",
          "numericUnit": "millisecond",
          "numericValue": 4000,
          "rating": "fail"
        },
        {
          "id": "unused-javascript",
          "numericUnit": "millisecond",
          "numericValue": 160,
          "rating": "average"
        }
      ],
      "pageId": "608ef83194f4a905853256f3",
      "queueId": "1620160629054-2ff90d34-179c-458e-90c0-68ebde9499e7",
      "report": "https://foo-software-lighthouse-reports-dev.s3.amazonaws.com/report-1620160693103.html",
      "scoreAccessibility": 95,
      "scoreBestPractices": 87,
      "scorePerformance": 99,
      "scoreProgressiveWebApp": 42,
      "scoreSeo": 98,
      "tag": "PR #2",
      "url": "https://www.foo.software"
    },
    {
      "createdAt": "2021-05-03T18:51:13.515Z",
      "finalScreenshot": "https://foo-software-lighthouse-reports-dev.s3.amazonaws.com/final-screenshot-1620067873314.jpg",
      "id": "60904621a87f70002fea1903",
      "lighthouseVersion": "7.3.0",
      "opportunities": [
        {
          "id": "uses-webp-images",
          "numericUnit": "millisecond",
          "numericValue": 9030,
          "rating": "fail"
        },
        {
          "id": "uses-responsive-images",
          "numericUnit": "millisecond",
          "numericValue": 4050,
          "rating": "fail"
        },
        {
          "id": "unused-javascript",
          "numericUnit": "millisecond",
          "numericValue": 160,
          "rating": "average"
        }
      ],
      "pageId": "608ef83194f4a905853256f3",
      "queueId": "1620067670955-2dd2e480-ceab-4b2b-b7b1-793b0bd8f6a0",
      "report": "https://foo-software-lighthouse-reports-dev.s3.amazonaws.com/report-1620067872741.html",
      "scoreAccessibility": 95,
      "scoreBestPractices": 87,
      "scorePerformance": 99,
      "scoreProgressiveWebApp": 42,
      "scoreSeo": 98,
      "tag": "PR #1",
      "url": "https://www.foo.software"
    }
  ]
}
```

### `updateLighthouseAudit`

```
PUT https://www.foo.software/api/v2/lighthouseAudits/:id
```

Updates a Lighthouse audit by `id` belonging to the authenticated account.

#### `updateLighthouseAudit` Parameters

The below parameters are "path" parameters.

```typescript
interface Parameters {
  id: string;
}
```

#### `updateLighthouseAudit` Payload

The below fields should populate the [request body as documented](/docs/api/rest-methods#put). For details about what each field means, see [`LighthouseAudit` resource documentation](/docs/api/resources#lighthouseaudit).

```typescript
interface Payload {
  tag?: string;
}
```

#### `updateLighthouseAudit` Example Response

```json
{
  "data": {
    "createdAt": "2021-05-03T18:51:13.515Z",
    "finalScreenshot": "https://foo-software-lighthouse-reports-dev.s3.amazonaws.com/final-screenshot-1620067873314.jpg",
    "id": "60904621a87f70002fea1903",
    "lighthouseVersion": "7.3.0",
    "opportunities": [
      {
        "id": "uses-webp-images",
        "numericUnit": "millisecond",
        "numericValue": 9030,
        "rating": "fail"
      },
      {
        "id": "uses-responsive-images",
        "numericUnit": "millisecond",
        "numericValue": 4050,
        "rating": "fail"
      },
      {
        "id": "unused-javascript",
        "numericUnit": "millisecond",
        "numericValue": 160,
        "rating": "average"
      }
    ],
    "pageId": "608ef83194f4a905853256f3",
    "queueId": "1620067670955-2dd2e480-ceab-4b2b-b7b1-793b0bd8f6a0",
    "report": "https://foo-software-lighthouse-reports-dev.s3.amazonaws.com/report-1620067872741.html",
    "scoreAccessibility": 95,
    "scoreBestPractices": 87,
    "scorePerformance": 99,
    "scoreProgressiveWebApp": 42,
    "scoreSeo": 98,
    "tag": "PR #1",
    "url": "https://www.foo.software"
  }
}
```

### `removeLighthouseAudit`

```
DELETE https://www.foo.software/api/v2/lighthouseAudits/:id
```

Removes a Lighthouse audit by `id` belonging to the authenticated account.

#### `removeLighthouseAudit` Parameters

The below parameters are "path" parameters.

```typescript
interface Parameters {
  id: string;
}
```

#### `removeLighthouseAudit` Example Response

Note: the below response represents the Lighthouse audit that was deleted.

```json
{
  "data": {
    "createdAt": "2021-05-03T18:51:13.515Z",
    "finalScreenshot": "https://foo-software-lighthouse-reports-dev.s3.amazonaws.com/final-screenshot-1620067873314.jpg",
    "id": "60904621a87f70002fea1903",
    "lighthouseVersion": "7.3.0",
    "opportunities": [
      {
        "id": "uses-webp-images",
        "numericUnit": "millisecond",
        "numericValue": 9030,
        "rating": "fail"
      },
      {
        "id": "uses-responsive-images",
        "numericUnit": "millisecond",
        "numericValue": 4050,
        "rating": "fail"
      },
      {
        "id": "unused-javascript",
        "numericUnit": "millisecond",
        "numericValue": 160,
        "rating": "average"
      }
    ],
    "pageId": "608ef83194f4a905853256f3",
    "queueId": "1620067670955-2dd2e480-ceab-4b2b-b7b1-793b0bd8f6a0",
    "report": "https://foo-software-lighthouse-reports-dev.s3.amazonaws.com/report-1620067872741.html",
    "scoreAccessibility": 95,
    "scoreBestPractices": 87,
    "scorePerformance": 99,
    "scoreProgressiveWebApp": 42,
    "scoreSeo": 98,
    "tag": "PR #1",
    "url": "https://www.foo.software"
  }
}
```
