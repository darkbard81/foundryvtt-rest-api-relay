import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          {siteConfig.title}
        </h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/intro">
            Get Started ⚡
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/api/"
            style={{marginLeft: '10px'}}>
            API Reference 📚
          </Link>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <strong>REST API</strong>
            <span>HTTP Endpoints</span>
          </div>
          <div className={styles.stat}>
            <strong>WebSocket</strong>
            <span>Real-time Communication</span>
          </div>
          <div className={styles.stat}>
            <strong>Secure</strong>
            <span>API Key Authentication</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Message relay server for the foundryvtt-rest-api Foundry Module. Connect your FoundryVTT game with external applications using REST API and WebSocket connections.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.codeSection}>
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <h2>Quick Start</h2>
                <p>Get up and running with the FoundryVTT REST API Relay in minutes:</p>
                <pre className={styles.codeBlock}>
                  <code>{`# Clone and start with Docker
git clone https://github.com/JustAnotherIdea/foundryvtt-rest-api-relay.git
cd foundryvtt-rest-api-relay
docker-compose up -d

# Server available at http://localhost:3010`}</code>
                </pre>
              </div>
              <div className="col col--6">
                <h2>Example API Call</h2>
                <p>Search for entities in your FoundryVTT world:</p>
                <pre className={styles.codeBlock}>
                  <code>{`curl -X GET "http://localhost:3010/api/search" \\
  -H "x-api-key: your-api-key" \\
  -H "x-client-id: your-client-id" \\
  -G -d "query=goblin" -d "type=Actor"`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
        
        <section className={styles.featuresSection}>
          <div className="container">
            <div className="text--center">
              <h2>Why Choose FoundryVTT REST API Relay?</h2>
              <p>Built specifically for the FoundryVTT ecosystem with modern web technologies</p>
            </div>
            <div className="row" style={{marginTop: '3rem'}}>
              <div className="col col--4">
                <div className={styles.featureCard}>
                  <h3>🚀 High Performance</h3>
                  <p>Optimized for low latency and high throughput with efficient WebSocket connections and caching.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureCard}>
                  <h3>🔧 Easy Integration</h3>
                  <p>Simple REST API and WebSocket interface that works with any programming language or platform.</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureCard}>
                  <h3>📊 Monitoring & Analytics</h3>
                  <p>Built-in request tracking, rate limiting, and comprehensive logging for production deployments.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
