import { module, test } from 'qunit';
// import helper from 'ember-qunit-assert-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | deprecations', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('template:components/x-foo', hbs`Hello World from Foo`);
  });

  test('shows a deprecation if a hash includes a component', async function(assert) {
    await render(hbs`
      <div class="my-target">
        {{#from-elsewhere name="my-target" as |content|}}
          {{content.myComponent}}
        {{/from-elsewhere}}
      </div>
      <div class="source">{{to-elsewhere named="my-target" send=(hash myComponent=(component "x-foo") someText="some text")}}</div>
      `);
    assert.expectDeprecation(/Sending a component inside a hash/);
  });
});
