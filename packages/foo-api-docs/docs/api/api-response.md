---
sidebar_position: 5
title: Documentation of Foo's API response for its page experience testing services
description: Documentation of Foo's API response for its page experience testing services. Foo provides testing and monitoring services using Lighthouse and Web Vitals.
---

# Response

All responses will have either a `data` or `error` field. A request for a collection of data will populate `data` with an array, otherwise `data` will be a single JSON object. If an error occurs - th `error` field will be populated with a message. Below is an illustration of the API response in TypeScript.

```typescript
interface ApiResponse {
  data?: any;
  error?: string;
}
```
