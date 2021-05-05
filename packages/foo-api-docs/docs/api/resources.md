---
sidebar_position: 2
---

# Resources

The sets of data we manage can be thought of as resources. Each resource is represented by a shape of data consistent across interfaces.

## Common Types

In this documentation we use TypeScript to illustrate data. Below are common types shared across some resources.

#### `Opportunity`

```typescript
interface Opportunity {
  id: string;
  numericValue: number;
  numericUnit?: 'millisecond' | string;
  rating: 'average' | 'error' | 'fail' | 'pass' | string;
}
```

Opportunities are load opportunities from the performance category exposed in the resulting JSON response from Lighthouse audits and consumed by [Lighthouse's report renderer](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/report/html/renderer/performance-category-renderer.js) to display "opportunities" in the generated HTML report. It maps `id` fields to [audit definitions](https://github.com/GoogleChrome/lighthouse/tree/master/lighthouse-core/audits). The `rating` field is what determines the color of bars seen in the "opportunities" section of the HTML report and reflects the opporunity impact.

<figure>
  <img src="/img/opportunities.png" alt="Lighthouse HTML report - opportunities" />
  <figcaption>
    Opportunities section of a Lighthouse generated report
  </figcaption>
</figure>

In the above report, the first corresponding opportunity looks like the below.

```json
{
  "id": "offscreen-images",
  "numericValue": 3450,
  "rating": "fail"
}
```

#### Device

```typescript
type Device = 'desktop' | 'mobile';
```

Lighthouse can mimic a desktop or mobile experience by emulating the device and typical corresponding network conditions.

## `Page`

```typescript
interface Page {
  createdAt: string;
  device: DeviceType;
  id: string;
  name: string;
  url: string;
}
```

A `Page` represents a URL and corresponding info to run Lighthouse audits against on [Foo](https://www.foo.software).

#### `Page`: Important Characteristics

- **`name`** is a user-defined field to describe the page.

## `QueueItem`

```typescript
interface QueueItem {
  createdAt: string;
  id: string;
  index?: number;
  pageId: string;
  status: 'available' | 'busy';
  tag: string;
  type: string;
  waitSeconds?: string;
}
```

Foo manages a queue of Lighthouse audits to run on a group of pods within a cluster. When a pod becomes available, it picks the next item from the queue with an `available` status and marks it as `busy`. `QueueItem`s with an `available` status are essentially Lighthouse audits waiting to start and all have associations to a `Page` resource. When the corresponding Lighthouse audit has completed, the `QueueItem` resource is deleted and a `LighthouseAudit` resource is created from it. The processing of this queue utilizes the [FIFO (First In First Out) method](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)).

#### `QueueItem`: Important Characteristics

- **`index`** represents the number in the queue order of an item. `1` means the item is next in line while `0` means a queue item is currently being audited by Lighthouse. If there are 25 items in the queue an `index` of `24` would mean that item is last. **Note**: `index` is calculated after creation and will not be populated in the creation response.
- **`pageId`** is the `id` of a page enqueued to be Lighthouse audited.
- **`status`** is the queue status. `available` is the value of `status` when a page is waiting to be Lighthouse audited and `busy` when an audit is in progress.
- **`tag`** is a user-defined or auto-generated string to describe the specific Lighthouse audit. On Foo users can tag an audit and can also do so via the API. This tag is transmitted to the resulting `LighthouseAudit` resource.
- **`type`** is the type of run being executed in terms of Foo's services. At the time of this writing, the only possible value of this field is `lighthouseAudit` but there will be others in the future.
- **`waitSeconds`** is an approximate value in seconds to account for the wait time of an item to be completed. This value should be taken with a grain of salt and not heavily relied upon. As our infrastructure changes, this value will be less reliable. This field will be either deprecated or revamped in the future at which time this doc will be updated. **Note**: `waitSeconds` is calculated after creation and will not be populated in the creation response.

## `LighthouseAudit`

```typescript
interface LighthouseAudit {
  createdAt: string;
  device: Device;
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
```

`LighthouseAudit` is the resulting payload from a Lighthouse audit on [Foo](https://www.foo.software).

#### `LighthouseAudit`: Important Characteristics

- **`finalScreenshot`** is a URL the last screenshot image captured by Lighthouse in the life cycle of the audit, hosted by Foo.
- **`error`** is only populated when Lighthouse exposes and error like [`PROTOCOL_TIMEOUT`](https://github.com/GoogleChrome/lighthouse/issues/6512). Typically scores will be `0` when this happens.
- **`opportunities`** represent performance load opportunities as detailed in the [opportunity section](#opportunity).
- **`report`** is the URL of the HTML report generated by Lighthouse, hosted by Foo.
- **`scoreAccessibility`**, **`scoreBestPractices`**, **`scorePerformance`**, **`scoreProgressiveWebApp`**, **`scoreSeo`** are the same scores you woud see at the top of a Lighthouse generated HTML report for each category respectively.
- **`tag`** is a user-defined or auto-generated string to describe the specific Lighthouse audit. On Foo users can tag an audit and can also do so via the API.
