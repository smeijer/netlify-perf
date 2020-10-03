const core = require('@actions/core');
const { writeDuration } = require('../../../src/lib/mongodb');
const { performance } = require('perf_hooks');
const fetch = require('node-fetch');

async function probe(url) {
  const start = performance.now();

  const res = await fetch(url);
  const data = await res.json();

  const duration = performance.now() - start;

  await writeDuration(data._id, duration);

  console.log(
    JSON.stringify(
      {
        ...data,
        duration,
      },
      '',
      '  ',
    ),
  );
}

probe().catch((error) => {
  core.setFailed(error.message);
});
