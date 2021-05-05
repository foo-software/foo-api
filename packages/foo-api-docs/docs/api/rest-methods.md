---
sidebar_position: 6
---

# REST Methods

Foo's REST API expects standard requests and payloads. Below are examples of different REST methods via [cURL](https://en.wikipedia.org/wiki/CURL#cURL).

## GET

```bash
curl -X GET "https://www.foo.software/api/v2/pages?limit=5" \
  -H "authorization: abc123"
```

## POST

```bash
curl -X POST "https://www.foo.software/api/v2/pages" \
  -H "authorization: abc123" \
  -H "content-type: application/json" \
  -d "{ \"url\": \"https://www.foo.software\", \"name\": \"Foo home page\" }"
```

## PUT

```bash
curl -X PUT "https://www.foo.software/api/v2/pages/123" \
  -H "authorization: abc123" \
  -H "content-type: application/json" \
  -d "{ \"name\": \"Foo home page (updated name)\" }"
```

## DELETE

```bash
curl -X DELETE "https://www.foo.software/api/v2/pages/123" \
  -H "authorization: abc123" \
  -H "content-type: application/json"
```
