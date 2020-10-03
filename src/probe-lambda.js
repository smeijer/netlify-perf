const { probe } = require('./lib/probe');
const { writeMetric } = require('./lib/mongodb');

if (require.main === module) {
  probeLambda().then((result) => {
    writeMetric('local', result);
    console.log(result);
  });
}

exports.handler = async (event, context) => {
  const result = await probe();
  const metric = await writeMetric(result);

  return {
    statusCode: 200,
    body: JSON.stringify(metric, '', '  '),
  };
};
