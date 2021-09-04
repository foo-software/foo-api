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

In order to use the below command, the correct settings for [`@foo-software/s3-directory-sync-cli`](https://github.com/foo-software/s3-directory-sync-cli) need to be configured. Refer to the [.github/workflows/deployDocs.yml](../../.github/workflows/deployDocs.yml) for a better understanding.

```
npm run deploy:s3
```

Deploys occur automaticlly with every commit to `master`. The CI pipeline does the following when commits with changes in the `deployDocs.yml` occur or in this package.

- `npm run build`
- Deploys all static files from `build` directory to AWS S3 via [`@foo-software/s3-directory-sync-cli`](https://github.com/foo-software/s3-directory-sync-cli).

## Static Site Hosting with SSL

This was a royal pain, but I managed to get this working with a dependency on a few AWS services. Note the domain is managed in Google Domains.

- [**S3**](https://s3.console.aws.amazon.com/s3/home?region=us-east-1): to host the actual files in a "bucket" which is exposed to the inernet via enabling for static websites.
- [**CloudFront**](https://console.aws.amazon.com/cloudfront/home): I tried a bunch of things between S3, ACM (Certificate Manager) Route 53 and Google Domains in an attempt to get SSL working on a custom domain. No luck there and I'm pretty sure that's impossible without CloudFront. It seems that CloudFront is really what connects all the dots for hosting a static website from an S3 bucket with SSL.
- [**ACM (Certificate Manager)**](https://console.aws.amazon.com/acm/home?region=us-east-1): This part wasn't straightforward, but this is where I created the SSL. Note that when you create the CloudFront distribution, there is a button to create an SSL from ACM.

Below is a list of steps pulled out of many other steps and mistakes that could probably accomplish the same.

- Follow [these steps](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) to create an S3 bucket with enabled as a website.
- In the last step of the above copy the static website hosting URL at the bottom of the "properties" section (without the protocol). In the next step you'll need this as the "Origin Domain Name". It will show you an autocomplete for that field with a similar string that reflects the correct bucket but don't make the mistake of selecting it. Paste the URL in this spot.
- Follow the [instructions here](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/#Using_a_website_endpoint_as_the_origin.2C_with_anonymous_.28public.29_access_allowed) to setup CloudFront. One thing I messed up... you have to add "Alternate Domain Names (CNAMEs)) as the Google Domain (which does seem a little backwards). I actually tried this at first when setting up but I got an error. I went back later and updated it successfully.
- Make sure to update Google Domains by adding the CNAME of the domain from CloudFront. This domain will look something like this: `d137a13jp4duuo.cloudfront.net`.
- I'm not sure if this was one of the things that made this all work in the end, but I went back to 
[**ACM (Certificate Manager)**](https://console.aws.amazon.com/acm/home?region=us-east-1) and got the CNAME from there also. It the name is something like `_9fb48b93d42bee633a5acf4f7bc7a5b8.docs.foo.software.` which becomes `_9fb48b93d42bee633a5acf4f7bc7a5b8.docs` when adding to Google Domains and the value looks like `_3ced558c29ffcb032912ae49a7ec14ec.zzxlnyslwt.acm-validations.aws` which I think is the "domain" field but in Google Domains you can add a CNAME with those. Not sure if that was even necessary, but I think it might have been. Everything worked after this.

To invalidate cache via the console [read this](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html#Invalidation_Requests).

From the docs above in CloudFront settings to invalidate all of the files in a directory, below are a couple examples:

- `/img/*`
- `/assets/css/*`
- `/assets/js/*`
- `/*`
- `/docs/api/*`
