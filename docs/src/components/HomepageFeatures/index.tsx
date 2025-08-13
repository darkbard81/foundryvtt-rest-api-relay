import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: React.ReactElement;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'REST API Bridge',
    Svg: require('@site/static/img/api-icon.svg').default,
    description: (
      <>
        Provides a comprehensive REST API interface for FoundryVTT, enabling external applications
        to interact with your game sessions through HTTP requests. Search entities, manage actors, 
        and control game state remotely.
      </>
    ),
  },
  {
    title: 'Real-time WebSocket',
    Svg: require('@site/static/img/websocket-icon.svg').default,
    description: (
      <>
        Real-time bidirectional communication with FoundryVTT through WebSocket connections.
        Perfect for live integrations, responsive external tools, and instant synchronization
        with your game world.
      </>
    ),
  },
  {
    title: 'Secure & Scalable',
    Svg: require('@site/static/img/security-icon.svg').default,
    description: (
      <>
        Built with enterprise-grade security featuring API key authentication, rate limiting,
        request monitoring, and comprehensive logging to ensure your FoundryVTT instance 
        remains secure and performant.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.ReactElement {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
