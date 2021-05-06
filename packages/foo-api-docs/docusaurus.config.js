/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Foo Docs',
  tagline: 'Documentation for automated data tracking to improve your website SEO, performance, user experience and engineering practices.',
  url: 'https://docs.foo.software',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'foo-software', // Usually your GitHub org/user name.
  projectName: 'foo-api', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Foo Docs',
      logo: {
        alt: 'Foo Logo',
        src: 'img/logo-600x600.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started',
          position: 'left',
          label: 'Getting Started',
        },
        {
          type: 'doc',
          docId: 'api/endpoints',
          position: 'left',
          label: 'REST API',
        },
        {
          type: 'doc',
          docId: 'api-client',
          position: 'left',
          label: 'Node.js API Client',
        },
        {
          href: 'https://github.com/foo-software/foo-api',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'REST API',
              to: '/docs/api/endpoints',
            },
            {
              label: 'Node.js API Client',
              to: '/docs/api-client',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/www.foo.software',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/foosoftware',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/foo-software',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://www.foo.software/tag/articles/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/foo-software',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Foo. Built with Docusaurus.`,
    },
    gtag: {
      trackingID: 'UA-137839001-3',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/foo-software/foo-api/tree/master/packages/foo-api-docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/foo-software/foo-api/tree/master/packages/foo-api-docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
