const handler = require('./handler');
const Response = require('./response');

describe('sendToDingding', () => {
  it('normal', (done) => {
    handler.sendToDingding(null, null, () => {done();});
  })
});

console.log(Response);
