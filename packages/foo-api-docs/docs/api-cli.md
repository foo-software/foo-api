---
sidebar_position: 3
title: Documentation of Foo's API CLI for its page experience testing services
description: Documentation of Foo's API CLI for its page experience testing services. Foo provides testing and monitoring services using Lighthouse and Web Vitals.
---

# API CLI

`foo-api` CLI is a Node.js package to provide utilities using [Foo's REST API](/docs/api/endpoints). This package is [hosted on NPM](https://www.npmjs.com/package/@foo-software/foo-api-cli).

## Getting Started

Follow the steps in [getting started](/docs) and make sure you have an API token as outlined in that section. You will use this token to populate [`FOO_API_TOKEN`](#foo_api_token) environment variable.

Install the CLI. This example installs globally.

```bash
npm install @foo-software/foo-api-cli -g
```

To see the version of the CLI you can use the `v` option as below.

```bash
foo-api --v
```

## Usage

Below is the format for the CLI. Note the dependency on [environment variables](#environment-variables).

```bash
foo-api [command] [resource] [options]
```

## Example Usage

In the below example we use the [`import`](#import) command to import pages to [Foo](https://www.foo.software) from a CSV file.

```bash
FOO_API_TOKEN=abc123 \
  foo-api import pages \
  --file-path ./input/pages.csv \
  --file-path-output ./output/pages.csv
```

If you've set `FOO_API_TOKEN` environment variable separately, it would simply be the below.

```bash
foo-api import pages \
  --file-path ./input/pages.csv \
  --file-path-output ./output/pages.csv
```

Boolean options can have a `false` value, or no value to represent a `true` value. Below shows how we use the `silent` boolean option.

```bash
foo-api import pages \
  --file-path ./input/pages.csv \
  --silent
```

## Global Options

The below options are available for all commands.

### `silent`

*Optional*

The silent options will supress all output entirely.

### `fail-on-error`

*Optional*

With batch operations, the CLI will throw an error if one occurs at the time it occurs. For example, the `import` command will import line by line from the specified CSV file. By default, if an error occurs, the CLI will store any error, and continue on - outputting all errors in the end. if `fail-on-error` is set, then the CLI will not continue and throw an error as soon as one occurs.

## Commands

### `import`

Imports pages to [Foo](https://www.foo.software) from a CSV file.

#### `import`: Example

```bash
foo-api import pages \
  --file-path ./input/pages.csv
```

#### `import`: Resources

- **Pages**: See [API documentation about the Page resource](/docs/api/resources#page).

#### `import`: Options

#### `file-path`

*Required*

The CSV file path relative to the CLI executor, for example: `./input/pages.csv`. When importing pages, the format of the CSV is important and must follow the below example format (`name`, `url`).

```title="./input/pages.csv"
Google,https://www.google.com
Foo Home Page,https://www.foo.software
```

#### `file-path-output`

*Optional*

A CSV file path relative to the CLI executor that the CLI will output the result to, for example: `./output/pages.csv`. When importing pages, the CLI will create an output similar to the following (`id`, `name`, `url`).

```title="./output/pages.csv"
abc123,Google,https://www.google.com
def456,Foo Home Page,https://www.foo.software
```

## Environment Variables

### `FOO_API_TOKEN`

*Required*

Follow the steps in [getting started](/docs) to acquire an API token and populate `FOO_API_TOKEN` environment variable with it. This is required for API [authentication](/docs/api/authentication).
