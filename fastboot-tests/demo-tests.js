/* eslint-env node */

const { module: Qmodule, test } = require('qunitjs');
const setup = require('./util');

Qmodule('demo app', function(hooks) {
  setup(hooks);

  test('first', async function(assert) {
    assert.expect(2);
    let doc = await this.visit('/');
    assert.ok(/This is the first page/.test(doc.body.textContent), 'found text');
  });

  test('second', async function(assert) {
    assert.expect(2);
    let doc = await this.visit('/second');
    assert.ok(/This is the second page/.test(doc.body.textContent), 'found text');
  });

  test('third', async function(assert) {
    assert.expect(2);
    let doc = await this.visit('/third');
    assert.ok(/This is the third page/.test(doc.body.textContent), 'found text');
  });

  test('four', async function(assert) {
    assert.expect(2);
    let doc = await this.visit('/fourth');
    assert.ok(/This is the fourth page/.test(doc.body.textContent), 'found text');
  });

});
