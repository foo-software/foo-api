---
sidebar_position: 2
title: Documentation of Foo's Lighthouse Check GitHub Action configuration for its page experience testing services
description: Documentation of Foo's Lighthouse Check GitHub Action configuration for its page experience testing services. Foo provides testing and monitoring services using Lighthouse and Web Vitals.
---

# Configuration

GitHub Actions are configured by populating [inputs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#inputs) consumed by the GitHub Action and utilizing [outputs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#outputs) provided by the GitHub Action. This section documents Lighthouse Check GitHub Action inputs and outputs.

See [the examples section](/docs/lighthouse-check-github-action/examples) to see the various ways one can configure Lighthouse Check GitHub Action.

## Inputs

### `awsAccessKeyId`
**Type**: `string | undefined`

The AWS `accessKeyId` for an S3 bucket.

### `awsBucket`
**Type**: `string | undefined`

The AWS `Bucket` for an S3 bucket.

### `awsRegion`
**Type**: `string | undefined`

The AWS `region` for an S3 bucket.

### `awsSecretAccessKey`
**Type**: `string | undefined`

The AWS `secretAccessKey` for an S3 bucket.

### `configFile`
**Type**: `string | undefined`

A configuration file path in JSON format which holds all options defined here. This file should be relative to the file being interpretted. In this case it will most likely be the root of the repo (`./`).

### `commentUrl`
**Type**: `string | undefined`

An endpoint to post comments to. This is only needed if you want to trigger comments on `push`. A `pull_request` trigger does not require this to be set. Typically this will be from GitHub's API. Example: `https://api.github.com/repos/:owner/:repo/commits/:commit_sha/comments.`

### `device`
**Type**: `'all' | 'desktop' | 'mobile' | undefined`

The device in which to run Lighthouse. **Note**: When specifying `all` - Lighthouse will run multiple times (once per device).

### `extraHeaders`
**Type**: `string | undefined`

Stringified HTTP Header object key/value pairs to send in requests.

Example:

```javascript
'{ "x-hello-world": "foobar", "x-some-other-thing": "hi" }'
```

### `fooApiToken`
**Type**: `string | undefined`

The [foo.software](https://www.foo.software) account API token found in the [account API page](https://www.foo.software/account/api).

### `gitAuthor`
**Type**: `string | undefined`

Used in Slack notifications, linking the authoring user to their GitHub profile. In a [GitHub context](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context) you could use `github.actor`.

### `gitBranch`
**Type**: `string | undefined`

Used in Slack notifications. In a [GitHub context](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context) you could use `github.ref`.

### `gitHubAccessToken`
**Type**: `string | undefined`

[Access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) of a user to post PR comments.

### `locale`
**Type**: `string | undefined`

A locale for Lighthouse reports. Example: `ja`

### `outputDirectory`
**Type**: `string | undefined`

An absolute directory path to output report. You can do this an an alternative or combined with an S3 upload.

### `overridesJsonFile`
**Type**: `string | undefined`

A JSON file with config and option fields to overrides defaults. See [example here](/docs/lighthouse-check-github-action/examples#overriding-config-and-option-defaults).

### `maxRetries`
**Type**: `number | undefined`

The maximum number of times to retry. **Note**: This is not supported when running against Foo's API as retry logic is already in place.

### `prCommentEnabled`
**Type**: `boolean | undefined`

If `true` and `gitHubAccessToken` is set scores will be posted as comments.

### `prCommentSaveOld`
**Type**: `boolean | undefined`

If `true` and PR comment options are set, new comments will be posted on every change vs only updating once comment with most recent scores.

### `sha`
**Type**: `string | undefined`

Used in Slack notifications. A git sha.

### `slackWebhookUrl`
**Type**: `string | undefined`

A Slack Incoming Webhook URL to send notifications to.

### `tag`
**Type**: `string | undefined`

An optional tag or name. Example: `build #2` or `v0.0.2`.

### `timeout`
**Type**: `number | undefined`

Minutes to timeout. If `wait` is `true` (it is by default), we wait for results. If this timeout is reached before results are received an error is thrown.

### `urls`
**Type**: `string | undefined`

A comma-separated list of URLs to be audited.

### `urlsJson`
- **Type**: `string | undefined`
- **Parsed Type**: `string[] | [string, string][]`

An alternative way of passing URLs to Lighthouse Check (instead of [`urls`](#urls)) to fulfill more advanced cases in which URLs have commas or you need to associate a URL with a Foo page token. See [examples](/docs/lighthouse-check-github-action/examples).

Simple example payload. This could be handy if you have commas in your URLs and therefore using [`urls`](#urls) input would be too tricky.

```javascript
'["https://www.foo.software", "https://www.google.com"]'
```

A more complex example below is if you're running Lighthouse via foo.software by passing [`fooApiToken`](#fooapitoken) and you want to associate pages you've added on Foo with temporary URLs using an ephemeral provided by a service like [Vercel](https://vercel.com). The parsed `urlsJson` value can be an array of strings or an array of string tuples. The first value of the tuple should be the Foo page API token and the second value will be the alternative URL. See the [Vercel example](/docs/lighthouse-check-github-action/examples#vercel-with-foo).

```javascript
'[["fooPageToken1", "https://some-temp-url.com/1234"], ["fooPageToken2", "https://some-temp-url.com/567"]]'
```

### `verbose`
**Type**: `boolean | undefined`

If `true`, print out steps and results to the console.

### `wait`
**Type**: `boolean | undefined`

If `true`, waits for all audit results to be returned, otherwise URLs are only enqueued.

## Outputs

### `lighthouseCheckResults`

The `lighthouseCheckResults` output is an object described in TypeScript below.

```typescript
interface Scores {
  accessibility: number;
  bestPractices: number;
  performance: number;
  progressiveWebApp: number;
  seo: number;
}

interface Data {
  // The corresponding URL of the Lighthouse audit.
  url: string;

  // An AWS S3 URL of the report if S3 inputs were specified and upload succeeded.
  report: string;
  scores: Scores;
}

export default interface LighthouseCheckResults {
  // A code set by lighthouse-check to represent success or failure.
  // Success will be `SUCCESS` while errors will look something
  // like `ERROR_${reason}`
  code: string;
  data: Data[];
}
```
