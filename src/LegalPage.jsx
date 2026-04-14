import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegalPage({ title, children }) {
  return (
    <div className="relative min-h-screen bg-base text-text-body">
      {/* Navbar */}
      <nav className="fixed top-4 left-0 right-0 mx-auto z-50 w-[min(92%,980px)]">
        <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center shadow-glow">
              <span className="font-bold text-white text-sm">K</span>
            </div>
            <span className="font-semibold tracking-tight text-text-primary">KRAVOK</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </nav>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6 pt-32 pb-20"
      >
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary mb-10">
          {title}
        </h1>
        <div className="legal-content">{children}</div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
              <span className="font-bold text-white text-xs">K</span>
            </div>
            <span>&copy; {new Date().getFullYear()} KRAVOK. Built by Tyler.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/terms-of-service" className="hover:text-text-primary transition-colors">Terms of Service</Link>
            <Link to="/user-agreement" className="hover:text-text-primary transition-colors">User Agreement</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
