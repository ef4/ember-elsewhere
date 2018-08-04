import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | to elsewhere', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('template:components/x-foo', hbs`Hello World from Foo`);
    this.owner.register('template:components/x-bar', hbs`Hello World from Bar`);
  });

  test('it works with inline from-elsewhere', async function(assert) {
    await render(hbs`<div class="my-target">{{from-elsewhere name="my-target"}}</div><div class="source">{{to-elsewhere named="my-target" send=(component "x-foo")}}</div>`);
    assert.dom(this.element.querySelector('.my-target')).hasText('Hello World from Foo');
  });

  test('it works with block-form from-elsewhere', async function(assert) {
    await render(hbs`<div class="my-target">{{#from-elsewhere name="my-target" as |c|}}{{component c}}{{/from-elsewhere}}</div><div class="source">{{to-elsewhere named="my-target" send=(component "x-foo")}}</div>`);
    assert.dom(this.element.querySelector('.my-target')).hasText('Hello World from Foo');
  });

  test('it works with with inline multiple-from-elsewhere', async function(assert) {
    await render(hbs`
      <div class="my-target">
        {{multiple-from-elsewhere name="my-target"}}
      </div>
      <div class="source">{{to-elsewhere named="my-target" send=(component "x-foo")}}</div>
      <div class="source">{{to-elsewhere named="my-target" send=(component "x-bar")}}</div>
    `);
    assert.notEqual(this.element.querySelector('.my-target').textContent.trim().indexOf('Hello World from Foo'), -1);
    assert.notEqual(this.element.querySelector('.my-target').textContent.trim().indexOf('Hello World from Bar'), -1);
  });

  test('it works with with block-form multiple-from-elsewhere', async function(assert) {
    await render(hbs`
      <div class="my-target">
        {{#multiple-from-elsewhere name="my-target" as |c|}}{{component c}}{{/multiple-from-elsewhere}}
      </div>
      <div class="source">{{to-elsewhere named="my-target" send=(component "x-foo")}}</div>
      <div class="source">{{to-elsewhere named="my-target" send=(component "x-bar")}}</div>
    `);
    assert.notEqual(this.element.querySelector('.my-target').textContent.trim().indexOf('Hello World from Foo'), -1);
    assert.notEqual(this.element.querySelector('.my-target').textContent.trim().indexOf('Hello World from Bar'), -1);
  });

  test('destination can come before source', async function(assert) {
    await render(hbs`<div class="my-target">{{from-elsewhere name="my-target"}}</div><div class="source">{{to-elsewhere named="my-target" send=(component "x-foo")}}</div>`);
    assert.dom(this.element.querySelector('.my-target')).hasText('Hello World from Foo');
  });

  test('source can come before destination', async function(assert) {
    await render(hbs`<div class="source">{{to-elsewhere named="my-target" send=(component "x-foo")}}</div><div class="my-target">{{from-elsewhere name="my-target"}}</div>`);
    assert.dom(this.element.querySelector('.my-target')).hasText('Hello World from Foo');
  });

});
