---
sidebar_position: 3
title: Documentation of Foo's Lighthouse Check GitHub Action examples for its page experience testing services
description: Documentation of Foo's Lighthouse Check GitHub Action examples for its page experience testing services. Foo provides testing and monitoring services using Lighthouse and Web Vitals.
---

# Examples

The Lighthouse Check GitHub Action provides many features. Each example below illustrates different available features.

## Basic

In the basic example below Lighthouse will run on the 2 URLs via `urls` input. Results will log to the GitHub Action console. Results will log to the console for all examples.

```yaml
name: Lighthouse
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Lighthouse
      uses: foo-software/lighthouse-check-action@master
      with:
        urls: 'https://www.foo.software,https://www.google.com'
```

## Save HTML Report Artifacts

In the example below we do the same as above, but also save HTML reports as [GitHub Action artifacts](https://docs.github.com/en/actions/advanced-guides/storing-workflow-data-as-artifacts).

```yaml
name: Lighthouse
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - run: mkdir ${{ github.workspace }}/tmp/artifacts
    - name: Lighthouse
      uses: foo-software/lighthouse-check-action@master
      with:
        outputDirectory: ${{ github.workspace }}/tmp/artifacts
        urls: 'https://www.foo.software,https://www.google.com'
    - name: Upload artifacts
      uses: actions/upload-artifact@master
      with:
        name: Lighthouse reports
        path: ${{ github.workspace }}/tmp/artifacts
```

## Save HTML Reports to AWS S3, Slack Notifications and PR Comments

In the below example we do the following:

- Run Lighthouse on 2 URLs
- Upload reports to AWS S3.
- Notify via Slack with details about the change from Git data.
- By specifying the `pull_request` trigger and `gitHubAccessToken` - we allow automatic comments of audits on the corresponding PR from the token user.

```yaml
name: Test Lighthouse Check
on: [pull_request]

jobs:
  lighthouse-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - run: mkdir ${{ github.workspace }}/tmp/artifacts
      - name: Run Lighthouse
        uses: foo-software/lighthouse-check-action@master
        with:
          awsAccessKeyId: ${{ secrets.LIGHTHOUSE_CHECK_AWS_ACCESS_KEY_ID }}
          awsBucket: ${{ secrets.LIGHTHOUSE_CHECK_AWS_BUCKET }}
          awsRegion: ${{ secrets.LIGHTHOUSE_CHECK_AWS_REGION }}
          awsSecretAccessKey: ${{ secrets.LIGHTHOUSE_CHECK_AWS_SECRET_ACCESS_KEY }}
          gitAuthor: ${{ github.actor }}
          gitBranch: ${{ github.ref }}
          gitHubAccessToken: ${{ secrets.LIGHTHOUSE_CHECK_GITHUB_ACCESS_TOKEN }}
          outputDirectory: ${{ github.workspace }}/tmp/artifacts
          urls: 'https://www.foo.software,https://www.foo.software/contact'
          sha: ${{ github.sha }}
          slackWebhookUrl: ${{ secrets.LIGHTHOUSE_CHECK_WEBHOOK_URL }}
```

## Running on Foo and Saving Results

[Foo automates Lighthouse testing](https://www.foo.software/lighthouse) by monitoring your website. It can provide a historical record of audits over time to track progression and degradation of website quality. [Create a free account](https://www.foo.software/register) to get started. With this, not only will you have automatic audits, but also any that you trigger additionally. Below are steps to trigger audits on URLs that you've created in your account.

#### Trigger Audits on All Pages in an Account

- Navigate to [your account API page](https://www.foo.software/account/api), and make note of the "API Token".
- Use this account API token as the [`fooApiToken` input](/docs/lighthouse-check-github-action/configuration#fooApiToken).

```yaml
name: Lighthouse Check
on: [pull_request]

jobs:
  lighthouse-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - run: npm install
      - name: Run Lighthouse
        uses: foo-software/lighthouse-check-action@master
        with:
          fooApiToken: 'myaccountapitoken'
          # ... all your other inputs
```

#### Trigger Audits on Only Certain Pages in an Account

- Navigate to [your account API page](https://www.foo.software/account/api), and make note of the "API Token".
- Navigate to any page from [your page dashboard](https://www.foo.software/dashboard/pages) and not the "page API token" at the top.
- Use the account token as the [`fooApiToken` input](/docs/lighthouse-check-github-action/configuration#fooApiToken) and page token (or group of page tokens) as [`urls` input](/docs/lighthouse-check-github-action/configuration#urls).


```yaml
name: Lighthouse Check
on: [pull_request]

jobs:
  lighthouse-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - run: npm install
      - name: Run Lighthouse
        uses: foo-software/lighthouse-check-action@master
        id: lighthouseCheck
        with:
          fooApiToken: 'myApiToken'
          urls: 'myPageToken1,myPageToken2'
          # ... all your other inputs
```

## Overriding Config and Option Defaults

**Note**: this approach is not supported when [running on Foo](#running-on-foo-and-saving-results).

You can override default config and options by specifying `overridesJsonFile` option which is consumed by [`path.resolve(overridesJsonFile)`](https://nodejs.org/api/path.html#path_path_resolve_paths). Contents of this overrides JSON file can have two possible fields; options and config. These two fields are eventually used by Lighthouse to populate opts and config arguments respectively as illustrated in ["using programmatically"](https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically). The two objects populating this JSON file are merged shallowly with the default [config](https://github.com/foo-software/lighthouse-check/blob/master/src/__snapshots__/lighthouseConfig.test.js.snap) and [options](https://github.com/foo-software/lighthouse-check/blob/master/src/__snapshots__/lighthouseOptions.test.js.snap).

> Example content of `overridesJsonFile`

```json
{
  "config": {
    "settings": {
      "onlyCategories": ["performance"]
    }
  },
  "options": {
    "disableStorageReset": true
  }
}
```

## Vercel

This example utilizes and assumes a setup of [Vercel Action](https://github.com/marketplace/actions/vercel-action).

```yaml
name: Lighthouse
on: [pull_request]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }} # Required
          github-token: ${{ secrets.GITHUB_TOKEN }} #Optional 
          vercel-args: '--prod' #Optional
          vercel-org-id: ${{ secrets.ORG_ID}}  #Required
          vercel-project-id: ${{ secrets.PROJECT_ID}} #Required 
          working-directory: ./sub-directory
      - name: Lighthouse
        uses: foo-software/lighthouse-check-action@master
        with:
          urls: ${{ steps.now.outputs.preview-url }}
          # ... all your other inputs
```

#### Vercel with Foo

If you're utilizing [Foo to save results](/docs/lighthouse-check-github-action/examples#running-on-foo-and-saving-results), you can associate a URL via the [`urlsJson` input](/docs/lighthouse-check-github-action/configuration#urlsjson) similar to the below. Note the use of the tuple, the first value being the Foo page API token and the second being the ephemeral URL.

```yaml
name: Lighthouse
on: [pull_request]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }} # Required
          github-token: ${{ secrets.GITHUB_TOKEN }} #Optional 
          vercel-args: '--prod' #Optional
          vercel-org-id: ${{ secrets.ORG_ID}}  #Required
          vercel-project-id: ${{ secrets.PROJECT_ID}} #Required 
          working-directory: ./sub-directory
      - name: Lighthouse
        uses: foo-software/lighthouse-check-action@master
        with:
          fooApiToken: ${{ secrets.LIGHTHOUSE_CHECK_API_TOKEN }}
          urlsJson: '[["fooPageToken", "${{ steps.now.outputs.preview-url }}"]]'
```

## Failing Workflows by Enforcing Minimum Scores

In the below we use `foo-software/lighthouse-check-status-action@master` to verify minimum scores and fail the workflow if they aren't met.

```yaml
name: Lighthouse
on: [pull_request]

jobs:
  lighthouse-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Lighthouse
        uses: foo-software/lighthouse-check-action@master
        id: lighthouseCheck
        with:
          urls: 'https://www.foo.software,https://www.foo.software/contact'
          # ... all your other inputs
      - name: Verify Lighthouse Check results
        uses: foo-software/lighthouse-check-status-action@master
        with:
          lighthouseCheckResults: ${{ steps.lighthouseCheck.outputs.lighthouseCheckResults }}
          minAccessibilityScore: "90"
          minBestPracticesScore: "50"
          minPerformanceScore: "50"
          minProgressiveWebAppScore: "50"
          minSeoScore: "50"
```
