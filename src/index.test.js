const { probe } = require('./index');

test('can collect data', async () => {
  const metrics = await probe('test');

  for (let key of ['time', 'st']) {
    expect(metrics).toHaveProperty(key);
  }
});
