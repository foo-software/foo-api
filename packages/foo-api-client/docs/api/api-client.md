# Node.js API Client

The API client is a Node.js package to interface with [Foo's REST API](./endpoints) programmatically. The package exports an API client class with methods for interacting with endpoints. The project is typed (for those working with TypeScript). Before proceeding you may want to first read the below sections.

- [Endpoints](./endpoints.md)
- [API Response](./api-response.md)
- [Authentication](./authentication.md)
- [Parameters](./parameters.md)
- [Resources](./resources.md)

## Getting Started

Follow the steps in [getting started](./getting-started.md) and make sure you have an `apiToken` as outlined in that section.

Install the API client in your project.

```bash
npm install @foo-software/foo-api-client
```

## Example Usage

Below illustrates an example of a variety of methods from the API client.

```javascript
const ApiClient = require('@foo-software/foo-api-client').ApiClient;

const client = new ApiClient({
  apiToken: 'abc123',
});

(async () => {
  // log a max of 10 pages
  const pages = await client.findPages({
    parameters: {
      limit: 10,
    },
  });
  console.log('pages', pages);

  // create a new page on Foo
  const { id } = await client.createPage({
    payload: {
      name: 'Pricing',
      url: 'https://www.foo.software/pricing'
    },
  });

  // we probably wouldn't do this in real life, but let's now update
  // the `name` of the previously created page.
  await client.updatePage({
    parameters: {
      id,
    },
    payload: {
      name: 'Pricing (updated name)',
    },
  });

  // queue up a Ligthouse audit for our new page. note - upon creating
  // a page - the first Lighthouse audit automatically occurs.
  await client.createPageQueueItem({
    parameters: {
      id,
    },
    tag: 'my programmatic Lighthouse audit',
  });

  // we can log all queue items for our new page. we should see the queue
  // item we added above.
  const queueItems = await client.findPageQueueItems({
    parameters: {
      id,
    },
  });
  console.log('queueItems', queueItems);

  // log all completed Lighthouse audits for our new page.
  const lighthouseAudits = await client.findPageLighthouseAudits({
    parameters: {
      id,
    },
  });
  console.log('lighthouseAudits', lighthouseAudits);

  // okay, that was fun, but let's kill our new page now.
  await client.removePage({
    parameters: {
      id: '608d897941166000bec8b8db',
    },
  });
})();
```

## Constructor

The API client should be instantiated with your API token like so.

```javascript
const client = new ApiClient({
  apiToken: 'abc123',
});
```

## Methods

All methods of the API client return an identical response of the corresponding endpoint. All endpoints respond with a consistent shape as described in the [API Response section](./api-response.md).

### `findPages`

A promise that communicates with and resolves a response from the [`findPages` endpoint](./endpoints#findpages).

```javascript
await apiClient.findPages({
  parameters: {/* your parameters here */},
});
```

### `createPage`

A promise that communicates with and resolves a response from the [`createPage` endpoint](./endpoints#createpage).

```javascript
await apiClient.createPage({
  payload: {/* your payload here */},
});
```

### `updatePage`

A promise that communicates with and resolves a response from the [`updatePage` endpoint](./endpoints#updatepage).

```javascript
await apiClient.updatePage({
  parameters: {/* your parameters here */},
  payload: {/* your payload here */},
});
```

### `removePage`

A promise that communicates with and resolves a response from the [`removePage` endpoint](./endpoints#removepage).

```javascript
await apiClient.removePage({
  parameters: {/* your parameters here */},
});
```

### `findPageQueueItems`

A promise that communicates with and resolves a response from the [`findPageQueueItems` endpoint](./endpoints#findpagequeueitems).

```javascript
await apiClient.findPageQueueItems({
  parameters: {/* your parameters here */},
});
```

### `createPageQueueItem`

A promise that communicates with and resolves a response from the [`createPageQueueItem` endpoint](./endpoints#createpagequeueitem).

```javascript
await apiClient.createPageQueueItem({
  parameters: {/* your parameters here */},
  payload: {/* your payload here */},
});
```

### `findPageLighthouseAudits`

A promise that communicates with and resolves a response from the [`findPageLighthouseAudits` endpoint](./endpoints#findpagelighthouseaudits).

```javascript
await apiClient.findPageLighthouseAudits({
  parameters: {/* your parameters here */},
});
```

### `updateLighthouseAudit`

A promise that communicates with and resolves a response from the [`updateLighthouseAudit` endpoint](./endpoints#updatelighthouseaudit).

```javascript
await apiClient.updateLighthouseAudit({
  parameters: {/* your parameters here */},
  payload: {/* your payload here */},
});
```

### `removeLighthouseAudit`

A promise that communicates with and resolves a response from the [`removeLighthouseAudit` endpoint](./endpoints#removelighthouseaudit).

```javascript
await apiClient.removeLighthouseAudit({
  parameters: {/* your parameters here */},
});
```
