# Foo API

[Foo (www.foo.software)](https://www.foo.software) provides website quality monitoring with tools such as Lighthouse. Foo can be used to establish historical records of Lighthouse audits to analyze website performance, SEO, accessibility and best practice. Monitoring website Lighthouse scores can be useful for maintainers to have insight when changes occur. Foo provides a means to manage Lighthouse audits of pages defined in its web UI. Foo also provides a [REST API](./endpoints.md) and a corresponding [Node.js API client](./api-client.md) to manage pages and Lighthouse audits programmatically which is what this project is all about!

This is a monorepo providing NPM packages for Foo's public API and documentation related to it.

## Packages

- [`@foo-software/foo-api-client`](packages/foo-api-client): An API client to communicate with Foo's REST API endpoints. Find it [on NPM](https://www.npmjs.com/package/@foo-software/foo-api-client).

## Documentation

- [REST API endpoints](./packages/foo-api-client/docs/api/endpoints.md)
- [Node.js API client](./packages/foo-api-client/docs/api/api-client.md)
- [Getting started with Foo and the API](./packages/foo-api-client/docs/api/getting-started.md)

> <img src="https://lighthouse-check.s3.amazonaws.com/images/logo-simple-blue-light-512.png" width="100" height="100" align="left" /> This package was brought to you by [Foo - a website quality monitoring tool](https://www.foo.software). Automatically test and monitor website performance, SEO and accessibility with Lighthouse. Analyze historical records of Lighthouse tests with automated monitoring. Report with confidence about SEO and performance improvements to stay on top of changes when they happen!
