import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import reactPlugin from '@vitejs/plugin-react';
import { createServer } from 'vite';

let server;
let html;

before(async () => {
  server = await createServer({
    appType: 'custom',
    configFile: false,
    logLevel: 'silent',
    plugins: [reactPlugin()],
    root: process.cwd(),
    server: { middlewareMode: true },
  });

  const module = await server.ssrLoadModule('/src/App.jsx');
  html = renderToStaticMarkup(
    React.createElement(
      StaticRouter,
      { location: '/' },
      React.createElement(module.default),
    ),
  );
});

after(async () => {
  await server?.close();
});

test('the public page proves restraint and the four-product system', () => {
  assert.match(html, /Know when to speak\. Know when not to\./);
  assert.match(html, /No help needed/);
  assert.match(html, /Oracle stays quiet/);
  assert.match(html, /Oracle/);
  assert.match(html, /Forge/);
  assert.match(html, /Hindsight/);
  assert.match(html, /Manager/);
  assert.match(html, /data-product-icon="oracle"/);
  assert.match(html, /data-product-icon="forge"/);
  assert.match(html, /data-product-icon="hindsight"/);
  assert.match(html, /data-product-icon="manager"/);
  assert.match(html, /Interactive preview/);
  assert.match(html, /class="button button-primary" href="#request-access">Request access/);
  assert.match(html, /Before\. During\. After\./);
  assert.match(html, /hero-signal-halo/);
  assert.doesNotMatch(html, /hero-crystal/);
  assert.doesNotMatch(html, /One call|same synthetic sales moment/i);
  assert.match(html, /\/brand\/kravok-wordmark-dark\.png/);
  assert.match(html, /\/brand\/oracle-wordmark-dark\.png/);
  assert.match(html, /\/brand\/oracle-icon-transparent\.png/);
  assert.doesNotMatch(html, /brand-mark/);
});

test('proof appears before the request-access conversion surface', () => {
  const proofIndex = html.indexOf('Trust, built in.');
  const accessIndex = html.indexOf('Built around the way your team sells.');

  assert.notEqual(proofIndex, -1);
  assert.notEqual(accessIndex, -1);
  assert.ok(proofIndex < accessIndex);
  assert.match(html, /Opens your email app\. Nothing sends until you choose to send it\./);
  assert.match(html, /mailto:support@kravok\.ai\?subject=Request%20access%20to%20KRAVOK/);
  assert.doesNotMatch(html, /mailto:[^"']*(?:body=|%40)/i);
});

test('forbidden and unverified marketing claims stay off the public page', () => {
  assert.doesNotMatch(html, /Free while/i);
  assert.doesNotMatch(html, /Zero lag|300\s*ms|instant cue/i);
  assert.doesNotMatch(html, /Windows (?:is )?(?:signed|code signed)/i);
  assert.doesNotMatch(html, /per-org isolation/i);
  assert.doesNotMatch(html, /manager alerts? (?:sent|delivered)/i);
  assert.doesNotMatch(html, /waitlist/i);
  assert.match(html, /Website privacy notice/);
  assert.match(html, /View access verification/);
  assert.match(html, /View Mac verification/);
  assert.match(html, /Internal release verification/);
  assert.doesNotMatch(html, /href="https:\/\/github\.com\/The-Ops-King\/KRAVOK\/actions\/runs\//);
  assert.match(html, /340/);
  assert.match(html, /access checks passed/);
  assert.match(html, /Signed/);
  assert.match(html, /Already have an invite code\?/);
  assert.doesNotMatch(html, /Synthetic demonstration|Synthetic walkthrough|RLS|CI run|Org layer|control plane|Correct restraint/i);
  assert.doesNotMatch(html, /href="\/privacy"/);
});
