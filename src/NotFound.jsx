import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';

const MagneticButton = ({ children, to, primary = false }) => {
  const ref = React.useRef(null);
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
    <motion.div ref={ref} onMouseMove={handle} onMouseLeave={reset} style={{ x: sx, y: sy }}>
      <Link to={to} className={`${base} ${styles}`}>
        {primary && (
          <>
            <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent-hover to-accent bg-[length:200%_100%] animate-gradient-shift" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-hover to-accent blur-xl" />
            <span className="absolute inset-px rounded-[11px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          </>
        )}
        <span className="relative flex items-center gap-2.5">{children}</span>
      </Link>
    </motion.div>
  );
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-base text-text-body overflow-hidden noise flex flex-col">
      {/* Aurora background */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => {
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
              animate={{ y: [0, -40 - Math.random() * 60, 0], opacity: [0, 1, 0] }}
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

      {/* Navbar */}
      <nav className="fixed top-4 left-0 right-0 mx-auto z-50 w-[min(92%,980px)]">
        <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center shadow-glow">
              <span className="font-bold text-white text-sm">K</span>
            </div>
            <span className="font-semibold tracking-tight text-text-primary">KRAVOK</span>
          </Link>
        </div>
      </nav>

      {/* 404 content */}
      <div className="relative flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl"
        >
          {/* Big 404 with shimmer */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <h1 className="text-[clamp(6rem,20vw,12rem)] font-semibold tracking-[-0.04em] leading-none shimmer-text select-none">
              404
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight mt-4 mb-3">
              This page doesn&apos;t exist
            </h2>
            <p className="text-text-secondary max-w-md mx-auto mb-10">
              Looks like you wandered off the call. Let&apos;s get you back on track.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton to="/" primary>
              <Home className="w-4 h-4" /> Back to home
            </MagneticButton>
          </motion.div>

          {/* Decorative glass card behind */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 glass rounded-2xl p-5 max-w-xs mx-auto"
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-hover" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-accent-hover animate-ping" />
              </div>
              <span className="text-xs tracking-[0.2em] text-text-secondary font-mono">ORACLE</span>
            </div>
            <div className="glass-accent rounded-xl p-4 mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono tracking-[0.2em] text-accent-hover">TIP</span>
              </div>
              <p className="text-sm text-text-body leading-snug">
                The page you&apos;re looking for isn&apos;t here. Try heading back to the homepage.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
              <span className="font-bold text-white text-xs">K</span>
            </div>
            <span>&copy; {new Date().getFullYear()} KRAVOK. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
