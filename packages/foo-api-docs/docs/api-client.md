---
sidebar_position: 4
title: Documentation of Foo's Node.js API CLI for its page experience testing services
description: Documentation of Foo's Node.js API CLI for its page experience testing services. Foo provides testing and monitoring services using Lighthouse and Web Vitals.
---

# Node.js API Client

The API client is a Node.js package to interface with [Foo's REST API](/docs/api/endpoints) programmatically. This package is [hosted on NPM](https://www.npmjs.com/package/@foo-software/foo-api-client) and exports an API client class with methods for interacting with endpoints. The project is typed (for those working with TypeScript). Before proceeding you may want to first read the below sections.

- [API Endpoints](/docs/api/endpoints)
- [API Response](/docs/api/api-response)
- [Authentication](/docs/api/authentication)
- [Parameters](/docs/api/parameters)
- [Resources](/docs/api/resources)

## Getting Started

Follow the steps in [getting started](/docs) and make sure you have an `apiToken` as outlined in that section.

Install the API client in your project.

```bash
npm install @foo-software/foo-api-client
```

## TypeScript

We use `tsc` to generate types and if you use TypeScript, you may need to match our TypeScript version if you have build errors. Check our [`package.json`](https://github.com/foo-software/foo-api/blob/master/packages/foo-api-client/package.json) to find our TypeScript version.

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
  const { data: { id } } = await client.createPage({
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

All methods of the API client return an identical response of the corresponding endpoint. All endpoints respond with a consistent shape as described in the [API Response section](/docs/api/api-response).

### `findPages`

A promise that communicates with and resolves a response from the [`findPages` endpoint](/docs/api/endpoints#findpages).

```javascript
await apiClient.findPages({
  parameters: {/* your parameters here */},
});
```

### `createPage`

A promise that communicates with and resolves a response from the [`createPage` endpoint](/docs/api/endpoints#createpage).

```javascript
await apiClient.createPage({
  payload: {/* your payload here */},
});
```

### `updatePage`

A promise that communicates with and resolves a response from the [`updatePage` endpoint](/docs/api/endpoints#updatepage).

```javascript
await apiClient.updatePage({
  parameters: {/* your parameters here */},
  payload: {/* your payload here */},
});
```

### `removePage`

A promise that communicates with and resolves a response from the [`removePage` endpoint](/docs/api/endpoints#removepage).

```javascript
await apiClient.removePage({
  parameters: {/* your parameters here */},
});
```

### `findPageQueueItems`

A promise that communicates with and resolves a response from the [`findPageQueueItems` endpoint](/docs/api/endpoints#findpagequeueitems).

```javascript
await apiClient.findPageQueueItems({
  parameters: {/* your parameters here */},
});
```

### `createPageQueueItem`

A promise that communicates with and resolves a response from the [`createPageQueueItem` endpoint](/docs/api/endpoints#createpagequeueitem).

```javascript
await apiClient.createPageQueueItem({
  parameters: {/* your parameters here */},
  payload: {/* your payload here */},
});
```

### `findPageLighthouseAudits`

A promise that communicates with and resolves a response from the [`findPageLighthouseAudits` endpoint](/docs/api/endpoints#findpagelighthouseaudits).

```javascript
await apiClient.findPageLighthouseAudits({
  parameters: {/* your parameters here */},
});
```

### `updateLighthouseAudit`

A promise that communicates with and resolves a response from the [`updateLighthouseAudit` endpoint](/docs/api/endpoints#updatelighthouseaudit).

```javascript
await apiClient.updateLighthouseAudit({
  parameters: {/* your parameters here */},
  payload: {/* your payload here */},
});
```

### `removeLighthouseAudit`

A promise that communicates with and resolves a response from the [`removeLighthouseAudit` endpoint](/docs/api/endpoints#removelighthouseaudit).

```javascript
await apiClient.removeLighthouseAudit({
  parameters: {/* your parameters here */},
});
```
