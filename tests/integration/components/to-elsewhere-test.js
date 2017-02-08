import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('to-elsewhere', 'Integration | Component | to elsewhere', {
  integration: true,
  beforeEach() {
    this.register('template:components/x-foo', hbs`Hello World from Foo`);
    this.register('template:components/x-bar', hbs`Hello World from Bar`);
  }
});

test('it works with inline from-elsewhere', function(assert) {
  this.render(hbs`<div class="my-target">{{from-elsewhere name="my-target"}}</div><div class="source">{{to-elsewhere named="my-target" send=(component "x-foo")}}</div>`);
  assert.equal(this.$('.my-target').text().trim(), 'Hello World from Foo');
});

test('it works with block-form from-elsewhere', function(assert) {
  this.render(hbs`<div class="my-target">{{#from-elsewhere name="my-target" as |c|}}{{component c}}{{/from-elsewhere}}</div><div class="source">{{to-elsewhere named="my-target" send=(component "x-foo")}}</div>`);
  assert.equal(this.$('.my-target').text().trim(), 'Hello World from Foo');
});

test('it works with with inline multiple-from-elsewhere', function(assert) {
  this.render(hbs`
    <div class="my-target">
      {{multiple-from-elsewhere name="my-target"}}
    </div>
    <div class="source">{{to-elsewhere named="my-target" send=(component "x-foo")}}</div>
    <div class="source">{{to-elsewhere named="my-target" send=(component "x-bar")}}</div>
  `);
  assert.notEqual(this.$('.my-target').text().trim().indexOf('Hello World from Foo'), -1);
  assert.notEqual(this.$('.my-target').text().trim().indexOf('Hello World from Bar'), -1);
});

test('it works with with block-form multiple-from-elsewhere', function(assert) {
  this.render(hbs`
    <div class="my-target">
      {{#multiple-from-elsewhere name="my-target" as |c|}}{{component c}}{{/multiple-from-elsewhere}}
    </div>
    <div class="source">{{to-elsewhere named="my-target" send=(component "x-foo")}}</div>
    <div class="source">{{to-elsewhere named="my-target" send=(component "x-bar")}}</div>
  `);
  assert.notEqual(this.$('.my-target').text().trim().indexOf('Hello World from Foo'), -1);
  assert.notEqual(this.$('.my-target').text().trim().indexOf('Hello World from Bar'), -1);
});
