# Parameters

API methods that are "read-only" will typically support the following optional parameters. In the REST API these are query parameters. Below is a TypeScript representation useful when using [Foo's Node.js API client](./api-client.md).

```typescript
export interface Parameters {
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
