import { typeOf } from '@ember/utils';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Service | ember elsewhere', function (hooks) {
  setupTest(hooks);

  test('it exposes currently active component', function (assert) {
    let service = this.owner.lookup('service:ember-elsewhere');
    let component = {};

    run(() => {
      service.show('source', 'my-sidebar', component);
    });

    assert.strictEqual(
      typeOf(service.get('actives.my-sidebar')),
      'array',
      'it returns an array'
    );
    assert.strictEqual(
      service.get('actives.my-sidebar.lastObject.component'),
      component,
      'last object in the array is the active component'
    );
  });

  test('it removes cleared component', function (assert) {
    let service = this.owner.lookup('service:ember-elsewhere');
    let component = {};

    run(() => {
      service.show('source', 'my-sidebar', component);
    });

    run(() => {
      service.clear('source');
    });

    assert.strictEqual(service.get('actives.my-sidebar'), undefined);
  });

  test('last shown source wins', function (assert) {
    let service = this.owner.lookup('service:ember-elsewhere');
    let componentA = { x: 'foo' };
    let componentB = { x: 'bar' };

    run(() => {
      service.show('sourceA', 'my-sidebar', componentA);
      service.show('sourceB', 'my-sidebar', componentB);
    });

    assert.strictEqual(
      service.get('actives.my-sidebar.lastObject.component'),
      componentB
    );

    run(() => {
      service.show('sourceB', 'my-sidebar', componentB);
      service.show('sourceA', 'my-sidebar', componentA);
    });

    assert.strictEqual(
      service.get('actives.my-sidebar.lastObject.component'),
      componentA
    );
  });

  test('earlier shown source takes back over when later source clears', function (assert) {
    let service = this.owner.lookup('service:ember-elsewhere');
    let componentA = {};
    let componentB = {};

    run(() => {
      service.show('sourceA', 'my-sidebar', componentA);
      service.show('sourceB', 'my-sidebar', componentB);
    });

    assert.strictEqual(
      service.get('actives.my-sidebar.lastObject.component'),
      componentB
    );

    run(() => {
      service.clear('sourceB');
    });

    assert.strictEqual(
      service.get('actives.my-sidebar.lastObject.component'),
      componentA
    );
  });

  test('includes all the source', function (assert) {
    let service = this.owner.lookup('service:ember-elsewhere');
    let componentA = {};
    let componentB = {};

    run(() => {
      service.show('sourceA', 'my-sidebar', componentA);
      service.show('sourceB', 'my-sidebar', componentB);
    });

    assert.strictEqual(
      typeOf(service.get('actives.my-sidebar')),
      'array',
      'it returns an array'
    );
    assert.strictEqual(
      service.get('actives.my-sidebar.firstObject.component'),
      componentA
    );
    assert.strictEqual(
      service.get('actives.my-sidebar.lastObject.component'),
      componentB
    );
  });
});
