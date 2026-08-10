import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

let server;

before(async () => {
  server = await createServer({
    appType: 'custom',
    configFile: false,
    logLevel: 'silent',
    optimizeDeps: { noDiscovery: true },
    root: process.cwd(),
    server: { middlewareMode: true },
  });
});

after(async () => {
  await server?.close();
});

async function renderComponent(path) {
  const module = await server.ssrLoadModule(path);
  return renderToStaticMarkup(React.createElement(module.default));
}

test('Oracle renders correct restraint before an objection cue', async () => {
  const html = await renderComponent('/src/components/OracleDemo.jsx');

  assert.match(html, /Fictional example/);
  assert.match(html, /Oracle stays quiet/);
  assert.match(html, /No cue is needed/);
  assert.match(html, /role="tablist"/);
  assert.doesNotMatch(html, /Ask what waiting costs/);
});

test('Forge renders a real default persona turn with difficulty controls', async () => {
  const html = await renderComponent('/src/components/ForgeDemo.jsx');

  assert.match(html, /Fictional example/);
  assert.match(html, /The Skeptic/);
  assert.match(html, /What happens when it doesn&#x27;t/);
  assert.match(html, /role="tablist"/);
});

test('Hindsight renders a complete debrief and selectable moments', async () => {
  const html = await renderComponent('/src/components/HindsightDemo.jsx');

  assert.match(html, /Fictional example/);
  assert.match(html, />78</);
  assert.match(html, /What worked/);
  assert.match(html, /let the ordinary opening breathe/i);
});

test('Manager renders one synthetic organization and the real review actions', async () => {
  const html = await renderComponent('/src/components/ManagerDemo.jsx');

  assert.match(html, /Fictional example/);
  assert.match(html, /Example Team A/);
  assert.match(html, /Correct/);
  assert.match(html, /Misfire/);
  assert.match(html, /Resolve/);
  assert.match(html, /False positive/);
  assert.match(html, /Changes stay in this preview/i);
  assert.doesNotMatch(html, /Example Team B.*Ask what waiting costs/s);
});
