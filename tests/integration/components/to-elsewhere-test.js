import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setComponentTemplate } from '@ember/component';
import templateOnlyComponent from '@ember/component/template-only';

module('Integration | Component | to elsewhere', function (hooks) {
  setupRenderingTest(hooks);

  hooks.before(function () {
    this.Foo = setComponentTemplate(
      hbs`<div id="foo">Hello World from Foo</div>`,
      templateOnlyComponent()
    );

    this.Bar = setComponentTemplate(
      hbs`<div id="bar">Hello World from Bar</div>`,
      templateOnlyComponent()
    );

    this.Baz = setComponentTemplate(
      hbs`<div id="baz">{{@outsideParams.greeting}} from Baz</div>`,
      templateOnlyComponent()
    );

    this.Blip = setComponentTemplate(
      hbs`<div id="blip">{{@outsideParams.greeting}} from Blip</div>`,
      templateOnlyComponent()
    );
  });

  test('it works with inline from-elsewhere', async function (assert) {
    await render(
      hbs`<div class="my-target"><FromElsewhere @name="my-target"/></div><div class="source"><ToElsewhere @named="my-target" @send={{this.Foo}}/></div>`
    );
    assert
      .dom(this.element.querySelector('.my-target'))
      .hasText('Hello World from Foo');
  });

  test('it works with block-form from-elsewhere', async function (assert) {
    await render(
      hbs`<div class="my-target"><FromElsewhere @name="my-target" as |C|><C /></FromElsewhere></div><div class="source"><ToElsewhere @named="my-target" @send={{this.Foo}} /></div>`
    );
    assert
      .dom(this.element.querySelector('.my-target'))
      .hasText('Hello World from Foo');
  });

  test('it works with with inline multiple-from-elsewhere', async function (assert) {
    await render(hbs`
      <div class="my-target">
        <MultipleFromElsewhere @name="my-target" />
      </div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Foo}}/></div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Bar}}/></div>
    `);
    assert.notEqual(
      this.element
        .querySelector('.my-target')
        .textContent.trim()
        .indexOf('Hello World from Foo'),
      -1
    );
    assert.notEqual(
      this.element
        .querySelector('.my-target')
        .textContent.trim()
        .indexOf('Hello World from Bar'),
      -1
    );
  });

  test('it works with with block-form multiple-from-elsewhere', async function (assert) {
    await render(hbs`
      <div class="my-target">
        <MultipleFromElsewhere @name="my-target" as |C|><C/></MultipleFromElsewhere>
      </div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Foo}}/></div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Bar}}/></div>
    `);
    assert.notEqual(
      this.element
        .querySelector('.my-target')
        .textContent.trim()
        .indexOf('Hello World from Foo'),
      -1
    );
    assert.notEqual(
      this.element
        .querySelector('.my-target')
        .textContent.trim()
        .indexOf('Hello World from Bar'),
      -1
    );
  });

  test('destination can come before source', async function (assert) {
    await render(
      hbs`<div class="my-target"><FromElsewhere @name="my-target"/></div><div class="source"><ToElsewhere @named="my-target" @send={{this.Foo}}/></div>`
    );
    assert
      .dom(this.element.querySelector('.my-target'))
      .hasText('Hello World from Foo');
  });

  test('source can come before destination', async function (assert) {
    await render(
      hbs`<div class="source"><ToElsewhere @named="my-target" @send={{this.Foo}}/></div><div class="my-target"><FromElsewhere @name="my-target"/></div>`
    );
    assert
      .dom(this.element.querySelector('.my-target'))
      .hasText('Hello World from Foo');
  });

  test('it accepts an outsideParams object for block form', async function (assert) {
    await render(
      hbs`
      <div class="source">
        <ToElsewhere @named="my-target" @send={{this.Blip}} @outsideParams={{hash greeting="Hello World"}}/>
      </div>
      <div class="my-target">
        <FromElsewhere @name="my-target" as |Content outsideParams|>
          <Content @outsideParams={{outsideParams}}/>
        </FromElsewhere>
      </div>`
    );
    assert
      .dom(this.element.querySelector('.my-target'))
      .hasText('Hello World from Blip');
  });

  test('multiple accepts an outsideParams object for block form', async function (assert) {
    await render(hbs`
      <div class="my-target">
        <MultipleFromElsewhere @name="my-target" as |C outsideParams|>
          <C @outsideParams={{outsideParams}}/>
        </MultipleFromElsewhere>
      </div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Baz}} @outsideParams={{hash greeting='Morning'}}/></div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Blip}} @outsideParams={{hash greeting='Afternoon'}}/></div>
    `);
    assert.notEqual(
      this.element
        .querySelector('.my-target')
        .textContent.trim()
        .indexOf('Morning from Baz'),
      -1
    );
    assert.notEqual(
      this.element
        .querySelector('.my-target')
        .textContent.trim()
        .indexOf('Afternoon from Blip'),
      -1
    );
  });

  test('when order is not provided, it rendered based on logical ordering', async function (assert) {
    await render(hbs`
      <div class="my-target">
        <MultipleFromElsewhere @name="my-target" as |C|><C/></MultipleFromElsewhere>
      </div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Foo}}/></div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Bar}}/></div>
    `);
    assert.strictEqual(
      this.element.querySelector('#foo').nextElementSibling,
      document.querySelector('#bar')
    );
  });

  test('when order is provided, it rendered elements based on the given order', async function (assert) {
    await render(hbs`
      <div class="my-target">
        <MultipleFromElsewhere @name="my-target" as |C|><C/></MultipleFromElsewhere>
      </div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Foo}} @order={{20}}/></div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Bar}} @order={{10}}/></div>
    `);

    assert.strictEqual(
      this.element.querySelector('#bar').nextElementSibling,
      document.querySelector('#foo')
    );
  });

  test('when some elements has no order but some does, it uses mixture of natural ordering and provided ordering', async function (assert) {
    await render(hbs`
      <div class="my-target">
        <MultipleFromElsewhere @name="my-target" as |C|><C/></MultipleFromElsewhere>
      </div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Blip}} @outsideParams={{hash greeting='Afternoon'}}/></div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Foo}} @order={{20}}/></div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Bar}} @order={{10}}/></div>
      <div class="source"><ToElsewhere @named="my-target" @send={{this.Baz}} @outsideParams={{hash greeting='Morning'}}/></div>
    `);
    assert.strictEqual(
      this.element.querySelector('#blip').nextElementSibling,
      document.querySelector('#bar')
    );
    assert.strictEqual(
      this.element.querySelector('#bar').nextElementSibling,
      document.querySelector('#foo')
    );
    assert.strictEqual(
      this.element.querySelector('#foo').nextElementSibling,
      document.querySelector('#baz')
    );
  });
});
