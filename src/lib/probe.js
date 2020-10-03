const { exec } = require('./exec');

function parse(stdout) {
  const [groups, keys, values] = stdout
    .split('\n') // split lines
    .filter(Boolean) // remove empty lines
    .map(
      (line) =>
        line
          .split(' ') // split space separated columns
          .filter(Boolean), // filter out empty cells (dividing space)
    );

  const result = keys.reduce((acc, key, idx) => {
    acc[key] = parseInt(values[idx], 10);
    return acc;
  }, {});

  return result;
}

async function probe() {
  const data = await vmstat();
  return parse(data);
}

exports.probe = probe;
