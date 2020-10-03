const { probe } = require('./lib/probe');
const { writeMetric } = require('./lib/mongodb');

if (require.main === module) {
  probe().then((result) => {
    writeMetric('local', result);
    console.log(result);
  });
}
