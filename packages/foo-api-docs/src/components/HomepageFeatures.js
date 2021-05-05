import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Lighthouse',
    Svg: require('../../static/img/lighthouse.svg').default,
    description: (
      <>
        Automated Lighthouse testing for website SEO and performance.
      </>
    ),
  },
  {
    title: 'Web Vitals',
    Svg: require('../../static/img/web-vitals.svg').default,
    description: (
      <>
        Collect and analyze web vitals for best web page experience and SEO.
      </>
    ),
  },
  {
    title: 'Binoculars',
    Svg: require('../../static/img/binoculars.svg').default,
    description: (
      <>
        SEO testing and monitoring to ensure search engines find your site.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <>
      <h2 className={styles.header}>What is Foo?</h2>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
