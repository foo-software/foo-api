---
sidebar_position: 3
title: Documentation of Foo's API authentication for its page experience testing services
description: Documentation of Foo's API authentication for its page experience testing services. Foo provides testing and monitoring services using Lighthouse and Web Vitals.
---

# Authentication

Foo's REST API implements a loose form of "token authentication" or "bearer authentication". At the time of this writing all endpoints require authentication and there is a single, "all or nothing" level of authorization (as in - no endpoints requre specific types of access... you either have access to all of them or you don't).

## Example

In the below example we request data for all pages associated with an an account having an `apiToken` of `abc123`.

```bash
curl -X GET "https://www.foo.software/api/v2/pages" \
  -H "authorization: abc123" \
  | json_pp
```

## How to Get an API Token

To acquire an API token, simply follow the steps below.

- If you don't have an account, [register with Foo here](https://www.foo.software/register).
- Navigate to the [account page on Foo](https://www.foo.software/account). On this page, you should see your API token. This token exists at the account level and is only accessible by [account users with access](https://www.foo.software/users).
