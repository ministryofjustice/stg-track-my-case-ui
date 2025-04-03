const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.status(200).send('Hello, World! Is there anyone out there???');
});

app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

app.get('/healthz', (_req, res) => {
  res.status(200).send('healthz::: is OK 2');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Main app running at http://localhost:${PORT}`);
});

// 👉 Separate listener on port 9999 for readiness probe
const health = express();

health.get('/', (req, res) => {
  if ('healthz' in req.query) {
    return res.status(200).send('✅ Probe OK: /?healthz');
  }
  res.status(404).send('Not found');
});

health.get('/healthz', (_req, res) => {
  res.status(200).send('healthz probe OK direct');
});

health.listen(9999, '0.0.0.0', () => {
  console.log(`🔍 Health check probe running at http://localhost:9999/healthz`);
});