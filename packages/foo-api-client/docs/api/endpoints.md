# Endpoints

Foo exposes a public REST API for management of pages to be audited by Lighthouse. Before proceeding you may want to first read the below sections.

- [API Response](./api-response.md)
- [Authentication](./authentication.md)
- [Parameters](./parameters.md)
- [Resources](./resources.md)
- [REST Methods](./rest-methods.md)

## Page Endpoints

Below are endpoints for managing [`Page` resources](./resources.md#page).

### `findPages`

```
GET https://www.foo.software/api/v2/pages
```

Returns a collection pages belonging to the authenticated account.

#### `findPages` Parameters

Supports all [common optional parameters](./parameters.md) as query parameters.

#### `findPages` Example Response

<details>
  <summary>Example</summary>
  
```json
{
  "data": [
    {
      "url" : "https://www.foo.software/lighthouse",
      "createdAt" : "2020-09-06T17:50:00.127Z",
      "device" : "mobile",
      "name" : "Lighthouse Page",
      "id" : "5f55214823d9f90038cb2d7b"
    },
    {
      "name" : "Web Vitals Page",
      "device" : "mobile",
      "id" : "5f55201023d9f90038cb2d74",
      "createdAt" : "2020-09-06T17:44:48.862Z",
      "url" : "https://www.foo.software/web-vitals/"
    }
  ]
}
```
</details>

### `createPage`

```
POST https://www.foo.software/api/v2/pages
```

Creates a new page belonging to the authenticated account.

#### `createPage` Payload

The below fields should populate the [request body as documented](./rest-methods.md#post). For details about what each field means, see [`Page` resource documentation](./resources.md#page).

```typescript
interface Payload {
  device?: 'desktop' | 'mobile';
  name: string;
  url: string;
}
```

#### `createPage` Example Response

<details>
  <summary>Example</summary>
  
```json
{
  "data": {
    "url" : "https://www.foo.software/lighthouse",
    "createdAt" : "2020-09-06T17:50:00.127Z",
    "device" : "mobile",
    "name" : "Lighthouse Page",
    "id" : "5f55214823d9f90038cb2d7b"
  }
}
```
</details>

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

The below fields should populate the [request body as documented](./rest-methods.md#put). For details about what each field means, see [`Page` resource documentation](./resources.md#page).

```typescript
interface Payload {
  device?: 'desktop' | 'mobile';
  name?: string;
  url?: string;
}
```

#### `updatePage` Example Response

<details>
  <summary>Example</summary>
  
```json
{
  "data": {
    "url" : "https://www.foo.software/lighthouse",
    "createdAt" : "2020-09-06T17:50:00.127Z",
    "device" : "mobile",
    "name" : "Lighthouse Page (updated)",
    "id" : "5f55214823d9f90038cb2d7b"
  }
}
```
</details>

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

<details>
  <summary>Example</summary>
  
```json
{
  "data": {
    "url" : "https://www.foo.software/lighthouse",
    "createdAt" : "2020-09-06T17:50:00.127Z",
    "device" : "mobile",
    "name" : "Lighthouse Page (updated)",
    "id" : "5f55214823d9f90038cb2d7b"
  }
}
```
</details>

## Queue Endpoints

Below are endpoints for managing [`QueueItem` resources](./resources.md#queueitem).

### `findPageQueueItems`

```
GET https://www.foo.software/api/v2/pages/:id/queueItems
```

Returns all queue items for a page (by page `id`) belonging to the authenticated account.

Note: this endpoint does not support [common optional parameters](./parameters.md) as it returns data from an ephemeral storage and will never return large amounts of data to justify sorting, paginating, etc.

#### `findPageQueueItems` Example Response

<details>
  <summary>Example</summary>
  
```json
{
  "data" : [
    {
      "createdAt" : "2021-05-04T21:15:10.499Z",
      "id" : "1620162910499-5aad2db2-1ad3-4556-b043-987e6fccf423",
      "index" : 0,
      "pageId" : "608ef83194f4a905853256f3",
      "tag" : "PR #1",
      "type" : "lighthouseAudit",
      "waitSeconds" : 30
    },
    {
      "createdAt" : "2021-05-04T21:15:10.499Z",
      "id" : "1620162936866-8cec2bd7-5d69-40c8-a0b8-a5cc33ba16a3",
      "index" : 1,
      "pageId" : "608ef83194f4a905853256f3",
      "tag" : "PR #2",
      "type" : "lighthouseAudit",
      "waitSeconds" : 40
    }
  ]
}
```
</details>

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

The below fields should populate the [request body as documented](./rest-methods.md#post). For details about what each field means, see [`Page` resource documentation](./resources.md#page).

```typescript
interface Payload {
  tag?: string;
}
```

#### `createPageQueueItem` Example Response

Note the `index` and `waitSeconds` fields are calculated after creation and are therefore not available in the `createPageQueueItem` response.

<details>
  <summary>Example</summary>
  
```json
{
  "data" : {
    "createdAt" : "2021-05-04T21:15:36.866Z",
    "id" : "1620162936866-8cec2bd7-5d69-40c8-a0b8-a5cc33ba16a3",
    "pageId" : "608ef83194f4a905853256f3",
    "status" : "available",
    "tag" : "PR #2",
    "type" : "lighthouseAudit"
  }
}
```
</details>

### `findPageLighthouseAudits`

```
GET https://www.foo.software/api/v2/pages/:id/lighthouseAudits
```

### `updateLighthouseAudit`

```
PUT https://www.foo.software/api/v2/lighthouseAudits/:id
```

### `removeLighthouseAudit`

```
DELETE https://www.foo.software/api/v2/lighthouseAudits/:id
```
