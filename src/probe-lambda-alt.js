const { exec } = require('./lib/exec');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let output = '';

  for (let cmd of ['iostat', 'vmstat', 'sar', 'top -n 1 -b']) {
    try {
      output += await exec(cmd);
      output += '-------------------------------------';
    } catch (e) {}
  }

  return callback(null, {
    statusCode: 200,
    body: output,
  });
};
