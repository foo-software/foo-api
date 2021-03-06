---
sidebar_position: 4
title: Documentation of Foo's API parameters for its page experience testing services
description: Documentation of Foo's API parameters for its page experience testing services. Foo provides testing and monitoring services using Lighthouse and Web Vitals.
---

# Parameters

API methods that are "read-only" and return an array of data will typically support the following optional parameters. In the REST API these are query parameters. Below is a TypeScript representation useful for [Foo's Node.js API client](/docs/api-client).

```typescript
interface Parameters {
  criteria?: 'ascending' | 'descending';
  from?: string;
  limit?: number;
  skip?: number;
  sort?: string;
  to?: string;
}
```

- **`criteria`** specifies sorting sequence as either `ascending` or `descending`.
- **`from`** is a "from" date. This field can be [any valid JavaScript date format](https://www.w3schools.com/js/js_date_formats.asp).
- **`limit`** can be used to specificy a limit to the number of results returned by the API.
- **`skip`** can be helpful with pagination as it specifies a beginning index of results to return.
- **`sort`** specifies a field to sort by used in tandem with `criteria`. Note that not all fields are supported for sort in the API.
- **`to`** is a "to" date. This field can be [any valid JavaScript date format](https://www.w3schools.com/js/js_date_formats.asp).
