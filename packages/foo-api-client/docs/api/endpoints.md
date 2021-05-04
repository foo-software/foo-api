# Endpoints

Foo exposes a public REST API for management of pages to be audited by Lighthouse. Before proceeding you may want to first read the below sections.

- [API Response](./api-response.md)
- [Authentication](./authentication.md)
- [Parameters](./parameters.md)
- [Resources](./resources.md)
- [REST Methods](./rest-methods.md)

## Page Endpoints

Below are endpoints for managing [`Page` resources](./resources#page).

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

Creates a new page associated with the authenticated account.

```
POST https://www.foo.software/api/v2/pages
```

#### `createPage` Payload

The below fields should populate the [request body as documented](./rest-methods#post). For details about what each field means, see [`Page` resource documentation](./resources#page).

```typescript
interface CreatePagePayload {
  device?: DeviceType;
  name: string;
  url: string;
}
```

### `updatePage`

```
PUT https://www.foo.software/api/v2/pages/:id
```

### `removePage`

```
DELETE https://www.foo.software/api/v2/pages/:id
```

### `findPageQueueItems`

```
GET https://www.foo.software/api/v2/pages/:id/queueItems
```

### `createPageQueueItem`

```
POST https://www.foo.software/api/v2/pages/:id/queueItems
```

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
