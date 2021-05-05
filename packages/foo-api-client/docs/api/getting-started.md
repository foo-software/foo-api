# Getting Started

[Foo (www.foo.software)](https://www.foo.software) provides website quality monitoring with tools such as Lighthouse. Foo can be used to establish historical records of Lighthouse audits to analyze website performance, SEO, accessibility and best practice. Monitoring website Lighthouse scores can be useful for maintainers to have insight when changes occur. Foo provides a means to manage Lighthouse audits of pages defined in its web UI. Foo also provides a [REST API](./endpoints.md) and a corresponding [Node.js API client](./api-client.md) to manage pages and Lighthouse audits programmatically which is what this project is all about!

To get started with the API, follow the below steps:

- Create an account on [Foo](https://www.foo.software/register). You can create a basic account for free and even use the API!
- Add "pages" via [Foo's dashboard](https://www.foo.software/register) to run Lighthouse against.
- Familiarize yourself with the dashboard from above by clicking around and manually triggering Lighthouse audits. By doing this, it might become apparent how Foo runs Lighthouse audits based on pages defined by the user and establishes a queue to do so.
- Find your API token in your [account page on Foo](https://www.foo.software/account) as you'll need it to [authenticate requests](./authentication.md) with our API.
- Skim through or take a deep of the [resources section](./resources.md) of this documentation to familiarize yourself with the type of data you can work with via the API.
- Head on over to the [endpoints section](./resources.md) of this documentation to learn how to make API requests.
- If you're interested in working with the API programmatically, you can use our [Node.js API client](./api-client.md).
