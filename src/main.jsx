import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.jsx';
import TermsOfService from './TermsOfService.jsx';
import UserAgreement from './UserAgreement.jsx';
import EndUserAgreement from './EndUserAgreement.jsx';
import Download from './Download.jsx';
import NotFound from './NotFound.jsx';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/user-agreement" element={<UserAgreement />} />
        <Route path="/end-user-agreement" element={<EndUserAgreement />} />
        <Route path="/download" element={<Download />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
