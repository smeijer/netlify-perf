'use strict';
const picoid = require('picoid');
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

console.log('mongo uri', MONGODB_URI);
let cachedDb = null;

function connect() {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((db) => {
    cachedDb = db.db();

    cachedDb.metrics = cachedDb.collection('metrics');

    return cachedDb;
  });
}

async function writeMetric(name, data) {
  const db = await connect();

  const metric = {
    _id: picoid(),
    name,
    time: Math.floor(Date.now() / 1000),
    ...data,
  };

  db.metrics.insertOne(metric);
  return metric;
}

async function writeDuration(_id, duration) {
  const db = await connect();

  db.metrics.updateOne({ _id }, { $set: { duration } });
}

exports.writeMetric = writeMetric;
exports.writeDuration = writeDuration;
