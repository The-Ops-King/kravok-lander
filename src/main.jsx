import React, { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const TermsOfService = lazy(() => import('./TermsOfService.jsx'));
const UserAgreement = lazy(() => import('./UserAgreement.jsx'));
const EndUserAgreement = lazy(() => import('./EndUserAgreement.jsx'));
const PrivacyNotice = lazy(() => import('./PrivacyNotice.jsx'));
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy.jsx'));
const Download = lazy(() => import('./Download.jsx'));
const NotFound = lazy(() => import('./NotFound.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<main className="min-h-screen bg-base" aria-busy="true" aria-label="Loading page" />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/website-privacy" element={<PrivacyNotice />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/user-agreement" element={<UserAgreement />} />
          <Route path="/end-user-agreement" element={<EndUserAgreement />} />
          <Route path="/download" element={<Download />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
