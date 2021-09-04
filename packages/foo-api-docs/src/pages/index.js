import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            Getting Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <Head>
        <script defer src="https://unpkg.com/web-vitals"></script>
        <script>{`
          const VITALS_ACCOUNT_ID = '613382df759af90024b205e1';
          const VITALS_URL = 'https://www.foo.software/api/vitals';

          function postVitals(metric) {
            const body = JSON.stringify({
              accountId: VITALS_ACCOUNT_ID,
              name: metric.name,
              url: window.location.href,
              value: metric.value,
            });

            return (
              (navigator.sendBeacon && navigator.sendBeacon(VITALS_URL, body)) ||
              fetch(VITALS_URL, {
                body,
                method: 'POST',
                keepalive: true,
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            );
          };

          addEventListener('DOMContentLoaded', function() {
            webVitals.getCLS(postVitals);
            webVitals.getFCP(postVitals);
            webVitals.getFID(postVitals);
            webVitals.getLCP(postVitals);
            webVitals.getTTFB(postVitals);
          });
        `}</script>
      </Head>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </>
  );
}
