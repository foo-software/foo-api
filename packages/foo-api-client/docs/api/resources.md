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

Opportunities are exposed in the resulting JSON response from Lighthouse audits and consumed by [Lighthouse's report renderer](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/report/html/renderer/performance-category-renderer.js) to display "opportunities" in the generated HTML report. It maps `id` fields to [audit definitions](https://github.com/GoogleChrome/lighthouse/tree/master/lighthouse-core/audits). The `rating` field is what determines the color of bars seen in the "opportunities" section of the HTML report and reflects the opporunity impact.

#### Device

```typescript
type Device = 'desktop' | 'mobile';
```

Lighthouse can mimic a desktop or mobile experience by emulating the device and typical corresponding network conditions.

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

## `QueueItem`

```typescript
interface QueueItem {
  createdAt: string;
  id: string;
  index: number;
  pageId: string;
  status: 'available' | 'busy';
  tag: string;
  type: string;
  waitSeconds: string;
}
```

Foo manages a queue of Lighthouse audits to run on a group of pods within a cluster. When a pod becomes available, it picks the next item from the queue with an `available` status and marks it as `busy`. `QueueItem`s with an `available` status are essentially Lighthouse audits waiting to start. When the corresponding Lighthouse audit has completed, the `QueueItem` resource is deleted and a `LighthouseAudit` resource is created.
