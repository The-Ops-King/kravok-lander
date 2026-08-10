import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Download, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import OracleDemo from './components/OracleDemo.jsx';
import ForgeDemo from './components/ForgeDemo.jsx';
import HindsightDemo from './components/HindsightDemo.jsx';
import ManagerDemo from './components/ManagerDemo.jsx';
import { KravokLockup, OracleLockup } from './components/BrandIdentity.jsx';
import ProductIcon from './components/ProductIcon.jsx';
import { PUBLIC_PROOFS } from './experience.js';
import RequestAccess from './RequestAccess.jsx';
import { usePageMetadata } from './usePageMetadata.js';

const PRODUCTS = [
  {
    id: 'oracle',
    name: 'Oracle',
    role: 'Live call guidance',
    description: 'Shows the right help when it matters—and stays quiet when it does not.',
    Demo: OracleDemo,
  },
  {
    id: 'forge',
    name: 'Forge',
    role: 'Practice calls',
    description: 'Lets reps practice difficult conversations before the real call.',
    Demo: ForgeDemo,
  },
  {
    id: 'hindsight',
    name: 'Hindsight',
    role: 'Call review',
    description: 'Shows what worked, what changed the call, and what to do next.',
    Demo: HindsightDemo,
  },
  {
    id: 'manager',
    name: 'Manager',
    role: 'Team overview',
    description: 'Gives leaders one place to review calls and improve the team’s guidance.',
    Demo: ManagerDemo,
  },
];

function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = [...document.querySelectorAll('[data-reveal]')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    root.classList.add('reveal-ready');

    if (reducedMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return () => root.classList.remove('reveal-ready');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="KRAVOK home">
        <KravokLockup />
      </a>

      <nav aria-label="Primary navigation" className="primary-nav">
        <a href="#system">How it works</a>
        <a href="#proof">Trust</a>
        <a href="#request-access">Access</a>
      </nav>

      <Link className="invited-link" to="/download">
        <Download aria-hidden="true" />
        <span>Already have an invite code?</span>
      </Link>
    </header>
  );
}

function SystemDemo() {
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0].id);
  const tabRefs = useRef([]);
  const selectedIndex = PRODUCTS.findIndex(({ id }) => id === activeProduct);
  const selected = PRODUCTS[selectedIndex];
  const ActiveDemo = selected.Demo;

  function selectAt(index) {
    const normalizedIndex = (index + PRODUCTS.length) % PRODUCTS.length;
    setActiveProduct(PRODUCTS[normalizedIndex].id);
    tabRefs.current[normalizedIndex]?.focus();
  }

  function handleTabKeyDown(event, index) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectAt(index + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectAt(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectAt(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectAt(PRODUCTS.length - 1);
    }
  }

  return (
    <section id="system" aria-labelledby="system-title" className="system-section" data-reveal>
      <div className="section-heading">
        <p className="eyebrow">One connected system</p>
        <h2 id="system-title">Before. During. After.</h2>
        <p>
          Practice with Forge. Get live guidance from Oracle. Review calls in Hindsight.
          Give managers a clear view of what needs attention.
        </p>
      </div>

      <div className="system-shell">
        <div className="product-tabs" role="tablist" aria-label="KRAVOK products">
          {PRODUCTS.map((product, index) => {
            const isSelected = product.id === activeProduct;
            return (
              <button
                key={product.id}
                ref={(node) => { tabRefs.current[index] = node; }}
                id={`product-tab-${product.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="product-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveProduct(product.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className="product-tab"
              >
                <ProductIcon product={product.id} />
                <span className="product-tab-copy">
                  <strong>{product.name}</strong>
                  <span>{product.role}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="product-panel"
          role="tabpanel"
          aria-labelledby={`product-tab-${selected.id}`}
          aria-live="polite"
          aria-atomic="false"
          tabIndex={0}
          className="product-panel"
        >
          <header className="product-panel-header">
            <div>
              {selected.id === 'oracle' && (
                <OracleLockup className="oracle-lockup--panel" />
              )}
              <p className="panel-kicker">{selected.name} / {selected.role}</p>
              <p>{selected.description}</p>
            </div>
            <span className="demo-disclosure">Interactive preview</span>
          </header>
          <div key={selected.id} className="product-demo-transition">
            <ActiveDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofLedger() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="proof-section" data-reveal>
      <div className="proof-intro">
        <p className="eyebrow">Verified before release</p>
        <h2 id="proof-title">Trust, built in.</h2>
        <p>
          We test access controls and verify the Mac app before it reaches your team.
        </p>
      </div>

      <dl className="proof-ledger">
        {PUBLIC_PROOFS.map((proof) => (
          <div key={proof.id} className="proof-row">
            <dt>
              <span className="proof-value">{proof.value}</span>
              <span className="proof-label">{proof.label}</span>
            </dt>
            <dd>
              <span>{proof.detail}</span>
              <span className="proof-status">
                <ShieldCheck aria-hidden="true" />
                Checked {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  timeZone: 'UTC',
                }).format(new Date(`${proof.verifiedOn}T12:00:00Z`))}
              </span>
              <details className="proof-snapshot">
                <summary>
                  <span>{proof.snapshot.actionLabel}</span>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <div className="proof-snapshot-card">
                  <header>
                    <span>KRAVOK verification</span>
                    <strong>{proof.snapshot.title}</strong>
                  </header>
                  <div className="proof-snapshot-result">
                    <ShieldCheck aria-hidden="true" />
                    <span>
                      <small>Result</small>
                      <strong>{proof.snapshot.result}</strong>
                    </span>
                  </div>
                  <dl>
                    <div>
                      <dt>Scope</dt>
                      <dd>{proof.snapshot.scope}</dd>
                    </div>
                    <div>
                      <dt>Checked</dt>
                      <dd>{new Intl.DateTimeFormat('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        timeZone: 'UTC',
                      }).format(new Date(`${proof.verifiedOn}T12:00:00Z`))}</dd>
                    </div>
                    <div>
                      <dt>Record</dt>
                      <dd>Internal release verification</dd>
                    </div>
                  </dl>
                  <p>{proof.snapshot.note}</p>
                </div>
              </details>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span className="brand footer-brand">
          <KravokLockup />
        </span>
        <p>Quiet when it should be. Useful when it matters.</p>
      </div>
      <nav aria-label="Legal and download links">
        <Link to="/website-privacy">Website privacy notice</Link>
        <Link to="/privacy-policy">Platform privacy policy</Link>
        <Link to="/terms-of-service">Terms</Link>
        <Link to="/user-agreement">User agreement</Link>
        <Link to="/download">Already have an invite code?</Link>
      </nav>
      <p className="copyright">&copy; {new Date().getFullYear()} KRAVOK.</p>
    </footer>
  );
}

export default function App() {
  useScrollReveal();

  usePageMetadata({
    title: 'KRAVOK — Know when to speak. Know when not to.',
    description: 'Practice hard conversations, get live guidance when it matters, and see what to improve after the call.',
  });

  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />

      <main id="main-content">
        <section aria-labelledby="hero-title" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">One system for better sales calls</p>
            <h1 id="hero-title">Know when to speak. Know when not to.</h1>
            <p className="hero-lede">
              Practice the call. Get help in the moment. See what to improve next.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#request-access">
                Request access
                <ArrowRight aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="#system">
                See how it works
              </a>
            </div>
          </div>

          <aside aria-label="KRAVOK operating principle" className="hero-stage">
            <span className="hero-stage-axis hero-stage-axis--horizontal" aria-hidden="true" />
            <span className="hero-stage-axis hero-stage-axis--vertical" aria-hidden="true" />
            <span className="hero-signal-halo" aria-hidden="true" />
            <div className="hero-decision-window">
              <header className="hero-decision-header">
                <OracleLockup className="oracle-lockup--principle" />
                <span className="live-judgment"><span aria-hidden="true" />Live guidance</span>
              </header>
              <div className="hero-transcript">
                <p>Prospect</p>
                <blockquote>“Sure, I have got about twenty minutes before my next call.”</blockquote>
              </div>
              <div className="silence-proof">
                <span aria-hidden="true" className="silence-indicator" />
                <div>
                  <strong>No help needed</strong>
                  <span>Oracle stays quiet.</span>
                </div>
              </div>
              <div className="hero-next-signal">
                <span>When Oracle steps in</span>
                <span>A clear objection triggers guidance.</span>
              </div>
            </div>
            <span className="hero-stage-caption">Help when it matters.</span>
          </aside>
        </section>

        <SystemDemo />
        <ProofLedger />
        <RequestAccess />
      </main>

      <Footer />
    </div>
  );
}
