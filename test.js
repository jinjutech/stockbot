const handler = require('./handler');

describe('sendToDingding', () => {
  it('normal', (done) => {
    handler.sendToDingding(null, null, () => {done();});
  })
});