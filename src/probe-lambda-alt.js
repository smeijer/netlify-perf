const { exec } = require('./lib/exec');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const output = await exec('top -n 1 -b');

  return callback(null, {
    statusCode: 200,
    body: output,
  });
};
