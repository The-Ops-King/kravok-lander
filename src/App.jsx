import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Download, Mic, Apple,
  Sparkles, Zap, ArrowRight, Check, Radio, Brain, LineChart,
} from 'lucide-react';

/* ---------- Animated background ---------- */
const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 grid-bg" />
    <motion.div
      className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full blur-[120px]"
      style={{ background: 'radial-gradient(circle, rgba(204,17,17,0.35), transparent 60%)' }}
      animate={{ x: [0, 80, -40, 0], y: [0, 60, 120, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-1/3 -right-40 w-[640px] h-[640px] rounded-full blur-[140px]"
      style={{ background: 'radial-gradient(circle, rgba(153,0,0,0.28), transparent 60%)' }}
      animate={{ x: [0, -60, 40, 0], y: [0, -50, 40, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full blur-[130px]"
      style={{ background: 'radial-gradient(circle, rgba(68,136,204,0.16), transparent 60%)' }}
      animate={{ x: [0, 50, -60, 0], y: [0, 40, -20, 0] }}
      transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base" />
  </div>
);

/* ---------- Floating particles ---------- */
const Particles = ({ count = 24 }) => {
  const particles = Array.from({ length: count });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 1;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-hover/60"
            style={{
              width: size, height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 8px rgba(204,17,17,0.8)',
            }}
            animate={{
              y: [0, -40 - Math.random() * 60, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

/* ---------- Magnetic button (Magic UI / Aceternity style) ---------- */
const MagneticButton = ({ children, href, primary = false, ...rest }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handle = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };

  const base = 'group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-sm tracking-wide overflow-hidden transition-colors';
  const styles = primary
    ? 'text-white'
    : 'text-text-body glass hover:border-white/20';

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handle}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles}`}
      {...rest}
    >
      {primary && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent-hover to-accent bg-[length:200%_100%] animate-gradient-shift" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-hover to-accent blur-xl" />
          <span className="absolute inset-px rounded-[11px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        </>
      )}
      <span className="relative flex items-center gap-2.5">{children}</span>
    </motion.a>
  );
};

/* ---------- Section reveal wrapper ---------- */
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ---------- Live call mock card ---------- */
const LiveCallMock = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, []);
  const tips = [
    { label: 'GOAL DETECTED', text: 'Prospect mentioned hitting $2M ARR this year. Mirror it.' },
    { label: 'OBJECTION', text: '"Too expensive" — reframe around cost of inaction.' },
    { label: 'PAIN', text: 'Churn is killing them. Pivot to retention story.' },
    { label: 'CLOSE WINDOW', text: 'They asked about pricing twice. Ask for the meeting.' },
  ];
  const current = tips[tick % tips.length];

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-accent/20 via-accent-subtle/10 to-transparent blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative glass rounded-2xl p-5 w-full max-w-md"
        style={{ transformPerspective: 1000 }}
      >
        {/* header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-accent-hover" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-accent-hover animate-ping" />
            </div>
            <span className="text-xs tracking-[0.2em] text-text-secondary font-mono">ORACLE · LIVE</span>
          </div>
          <span className="text-xs font-mono text-text-muted">00:14:23</span>
        </div>

        {/* waveform */}
        <div className="flex items-end gap-1 h-16 mt-5 mb-5">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-accent to-accent-hover rounded-sm"
              animate={{ height: [`${15 + Math.random() * 20}%`, `${40 + Math.random() * 60}%`, `${20 + Math.random() * 30}%`] }}
              transition={{ duration: 0.8 + Math.random() * 0.6, repeat: Infinity, repeatType: 'reverse', delay: i * 0.03 }}
            />
          ))}
        </div>

        {/* tip bubble */}
        <motion.div
          key={tick}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-accent rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-hover" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-accent-hover">{current.label}</span>
          </div>
          <p className="text-sm text-text-body leading-snug">{current.text}</p>
        </motion.div>

        {/* checklist */}
        <div className="mt-4 space-y-1.5">
          {['Discovery', 'Pain qualified', 'Decision maker', 'Close'].map((s, i) => (
            <div key={s} className="flex items-center gap-2 text-xs text-text-secondary">
              <div className={`w-3.5 h-3.5 rounded flex items-center justify-center ${i < (tick % 4) + 1 ? 'bg-success/20 border border-success/40' : 'border border-white/10'}`}>
                {i < (tick % 4) + 1 && <Check className="w-2.5 h-2.5 text-success" />}
              </div>
              <span className={i < (tick % 4) + 1 ? 'text-text-body' : ''}>{s}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ---------- Product card ---------- */
const ProductCard = ({ icon: Icon, name, tag, desc, i }) => (
  <Reveal delay={i * 0.08}>
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative glass rounded-2xl p-6 h-full overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl glass-accent flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent-hover" />
        </div>
        <div>
          <h3 className="font-semibold text-text-primary tracking-tight">{name}</h3>
          <span className="text-[10px] font-mono tracking-[0.15em] text-text-muted">{tag}</span>
        </div>
      </div>
      <p className="relative text-sm text-text-secondary leading-relaxed">{desc}</p>
    </motion.div>
  </Reveal>
);

/* ---------- Navbar ---------- */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="fixed top-4 left-0 right-0 mx-auto z-50 w-[min(92%,980px)]"
    >
      <div className={`glass rounded-2xl px-5 py-3 flex items-center justify-between transition-all ${scrolled ? 'shadow-elevation-3' : ''}`}>
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center shadow-glow">
            <span className="font-bold text-white text-sm">K</span>
          </div>
          <span className="font-semibold tracking-tight text-text-primary">KRAVOK</span>
        </a>
        <div className="hidden md:flex items-center gap-7 text-sm text-text-secondary">
          <a href="#products" className="hover:text-text-primary transition-colors">Products</a>
          <a href="#how" className="hover:text-text-primary transition-colors">How it works</a>
          <a href="#download" className="hover:text-text-primary transition-colors">Download</a>
        </div>
        <MagneticButton href="#download" primary>
          <Download className="w-4 h-4" /> Download
        </MagneticButton>
      </div>
    </motion.nav>
  );
};

/* ---------- Main app ---------- */
export default function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  const products = [
    { icon: Mic, name: 'Oracle', tag: 'LIVE COACH', desc: 'Real-time AI copilot on every call. Tracks the checklist, extracts notes, detects personality, and grades the close.' },
  ];

  return (
    <div className="relative min-h-screen bg-base text-text-body overflow-hidden noise">
      <AuroraBackground />
      <Particles />
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section className="relative pt-44 pb-32 px-6">
        <motion.div style={{ y: heroY }} className="relative max-w-6xl mx-auto">
          <Reveal>
            <div className="flex justify-center mb-6">
              <div className="glass rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 text-xs">
                <span className="bg-accent text-white px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider">NEW</span>
                <span className="text-text-secondary">Oracle MVP now live on macOS</span>
                <ArrowRight className="w-3 h-3 text-text-muted" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-center font-semibold tracking-[-0.03em] leading-[0.95] text-[clamp(3rem,8vw,7rem)]">
              <span className="block text-text-primary">The AI copilot</span>
              <span className="block">
                that closes with <span className="shimmer-text">you.</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 text-center text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              KRAVOK sits on every sales call. Coaches in real-time. Extracts the notes. Grades the close.
              Built for teams who are done losing deals they should&apos;ve won.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="#download" primary>
                <Apple className="w-4 h-4" /> Download for macOS
              </MagneticButton>
              <MagneticButton href="#products">
                See what&apos;s inside <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-text-muted">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> Universal (Intel + Apple Silicon)</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> macOS 13+</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> Free while in MVP</div>
            </div>
          </Reveal>

          {/* floating live mock */}
          <div className="mt-20 flex justify-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <LiveCallMock />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===================== PRODUCTS ===================== */}
      <section id="products" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-text-secondary mb-5">
                <Zap className="w-3 h-3 text-accent-hover" /> The Suite
              </div>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary">
                One tool. One mission.
              </h2>
              <p className="mt-4 text-text-secondary max-w-xl mx-auto">
                Everything a sales team needs to close more and compound performance.
              </p>
            </div>
          </Reveal>

          <div className="max-w-md mx-auto">
            {products.map((p, i) => <ProductCard key={p.name} {...p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how" className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-center text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mb-4">
              How Oracle works
            </h2>
            <p className="text-center text-text-secondary max-w-xl mx-auto mb-16">
              From the moment your rep hits dial, KRAVOK is listening, learning, and guiding.
            </p>
          </Reveal>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent hidden md:block" />
            {[
              { icon: Radio, title: 'Capture', desc: 'Dual-audio capture (mic + system) via ScreenCaptureKit. Zero lag, zero setup.' },
              { icon: Brain, title: 'Transcribe & Analyze', desc: 'Real-time transcription streams the conversation. AI detects stage, pain, and objections as they happen.' },
              { icon: Sparkles, title: 'Coach', desc: 'Tips surface the instant the prospect pauses. Structured notes fill themselves in.' },
              { icon: LineChart, title: 'Grade & Learn', desc: 'AI grades every call on 10 dimensions. Your reps improve with every dial.' },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className={`flex items-center gap-6 mb-8 ${i % 2 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                  <div className="glass rounded-2xl p-6 flex-1 max-w-md">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg glass-accent flex items-center justify-center">
                        <step.icon className="w-4 h-4 text-accent-hover" />
                      </div>
                      <span className="text-xs font-mono text-text-muted">STEP 0{i + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-1">{step.title}</h3>
                    <p className="text-sm text-text-secondary">{step.desc}</p>
                  </div>
                  <div className="hidden md:block relative">
                    <div className="w-4 h-4 rounded-full bg-accent shadow-glow relative z-10" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-accent animate-ping" />
                  </div>
                  <div className="hidden md:block flex-1" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DOWNLOAD CTA ===================== */}
      <section id="download" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="relative conic-border rounded-3xl">
              <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent/20 blur-[100px]" />

                <motion.div
                  animate={{ scale: [1, 1.08, 1], rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-accent mb-6"
                >
                  <Apple className="w-7 h-7 text-text-primary" />
                </motion.div>

                <h2 className="relative text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mb-4">
                  Get KRAVOK for macOS
                </h2>
                <p className="relative text-text-secondary max-w-lg mx-auto mb-10">
                  One download. Oracle included. Free while we&apos;re in MVP.
                  Sign in, start a call, and watch it work.
                </p>

                <div className="relative flex flex-col items-center gap-4">
                  <MagneticButton href="https://github.com/The-Ops-King/KRAVOK/releases/download/v0.1.1/KRAVOK-0.1.1-arm64.dmg" primary>
                    <Download className="w-5 h-5" />
                    Download KRAVOK.dmg
                  </MagneticButton>
                  <div className="text-xs text-text-muted font-mono">
                    Apple Silicon · macOS 13+ · 138 MB
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="relative border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
              <span className="font-bold text-white text-xs">K</span>
            </div>
            <span>© {new Date().getFullYear()} KRAVOK. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#products" className="hover:text-text-primary transition-colors">Products</a>
            <a href="#how" className="hover:text-text-primary transition-colors">How it works</a>
            <a href="#download" className="hover:text-text-primary transition-colors">Download</a>
            <Link to="/terms-of-service" className="hover:text-text-primary transition-colors">Terms of Service</Link>
            <Link to="/user-agreement" className="hover:text-text-primary transition-colors">User Agreement</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
