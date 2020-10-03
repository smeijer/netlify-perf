const childProcess = require('child_process');

async function exec(bin) {
  return new Promise((resolve, reject) => {
    childProcess.exec(bin, (error, stdout, stderr) => {
      if (error) {
        return reject(error.message);
      }

      if (stderr) {
        return reject(stderr);
      }

      resolve(stdout);
    });
  });
}

module.exports.exec = exec;
