import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { after, before, test } from 'node:test';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import reactPlugin from '@vitejs/plugin-react';
import { createServer } from 'vite';

let server;
let termsHtml;
let userTermsHtml;
let privacyHtml;
const privacyPolicyUrl = new URL('./PrivacyPolicy.jsx', import.meta.url);

before(async () => {
  server = await createServer({
    appType: 'custom',
    configFile: false,
    logLevel: 'silent',
    plugins: [reactPlugin()],
    root: process.cwd(),
    server: { middlewareMode: true },
  });

  const [terms, userTerms] = await Promise.all([
    server.ssrLoadModule('/src/TermsOfService.jsx'),
    server.ssrLoadModule('/src/UserAgreement.jsx'),
  ]);

  const render = (Component, location) => renderToStaticMarkup(
    React.createElement(
      StaticRouter,
      { location },
      React.createElement(Component),
    ),
  );

  termsHtml = render(terms.default, '/terms-of-service');
  userTermsHtml = render(userTerms.default, '/user-agreement');
  if (existsSync(privacyPolicyUrl)) {
    const privacy = await server.ssrLoadModule('/src/PrivacyPolicy.jsx');
    privacyHtml = render(privacy.default, '/privacy-policy');
  }
});

after(async () => {
  await server?.close();
});

test('public legal pages do not promise unimplemented retention, export, or cancellation features', () => {
  const publicLegalCopy = `${termsHtml} ${userTermsHtml}`;

  assert.doesNotMatch(publicLegalCopy, /automatically deleted|not exceeding 30 days/i);
  assert.doesNotMatch(publicLegalCopy, /export functionality|cancel your subscription.*through the Platform/i);
  assert.match(publicLegalCopy, /contact support@kravok\.ai/i);
});

test('platform privacy policy states actual data categories and request path', () => {
  assert.equal(existsSync(privacyPolicyUrl), true, 'the platform privacy policy must exist');
  assert.match(privacyHtml, /call transcripts/i);
  assert.match(privacyHtml, /account and organization information/i);
  assert.match(privacyHtml, /service providers/i);
  assert.match(privacyHtml, /support@kravok\.ai/i);
  assert.match(privacyHtml, /retention/i);
});
