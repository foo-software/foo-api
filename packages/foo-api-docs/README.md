# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```
npm run deploy:s3
```

But the correct settings for [`@foo-software/s3-directory-sync-cli`](https://github.com/foo-software/s3-directory-sync-cli) need to be configured. Refer to the [.github/workflows/deployDocs.yml](../../.github/workflows/deployDocs.yml) for a better understanding.

Deploys occur automaticlly with every commit to `master`. The CI pipeline does the following when commits with changes in the `deployDocs.yml` occur or in this package.

- `npm run build`
- Deploys all static files from `build` directory to AWS S3 via [`@foo-software/s3-directory-sync-cli`](https://github.com/foo-software/s3-directory-sync-cli).

This follows [docs from AWS to enable static websites on a bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) and [support custom domains via Route 53](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html).
