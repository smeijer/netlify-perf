const ncc = require('@vercel/ncc');
const fs = require('fs-extra');
const { basename, dirname, resolve } = require('path');

const options = {
  cache: false,
  externals: [],
  minify: true,
  sourceMap: false,
  sourceMapRegister: false,
  watch: false,
};

const functions = ['../src/probe-lambda.js', '../src/probe-lambda-alt.js'];

const client = ['../src/client/index.html'];

async function build() {
  await fs.remove(resolve(__dirname, '../dist'));

  for (let file of functions) {
    const out = resolve(
      __dirname,
      '../dist/functions',
      basename(file).split('.')[0],
      basename(file),
    );

    const { code } = await ncc(resolve(__dirname, file), options);
    await fs.mkdirp(dirname(out));
    await fs.writeFile(out, code, { encoding: 'utf-8' });
  }

  for (let file of client) {
    const out = resolve(__dirname, '../dist/client', basename(file));

    await fs.mkdirp(dirname(out));
    await fs.copy(resolve(__dirname, file), out);
  }
}

build();
