import { moduleFor, test } from 'ember-qunit';
import run from 'ember-runloop';

moduleFor('service:ember-elsewhere', 'Unit | Service | ember elsewhere', {
});

test('it exposes currently active component', function(assert) {
  let service = this.subject();
  let component = {};

  run(() => {
    service.show('source', 'my-sidebar', component);
  });

  assert.equal(service.get('actives.my-sidebar.component'), component);
});

test('it removes cleared component', function(assert) {
  let service = this.subject();
  let component = {};

  run(() => {
    service.show('source', 'my-sidebar', component);
  });

  run(() => {
    service.clear('source');
  });

  assert.equal(service.get('actives.my-sidebar.component'), undefined);
});

test('last shown source wins', function(assert) {
  let service = this.subject();
  let componentA = {};
  let componentB = {};

  run(() => {
    service.show('sourceA', 'my-sidebar', componentA);
    service.show('sourceB', 'my-sidebar', componentB);
  });

  assert.equal(service.get('actives.my-sidebar.component'), componentB);

  run(() => {
    service.show('sourceB', 'my-sidebar', componentB);
    service.show('sourceA', 'my-sidebar', componentA);
  });

  assert.equal(service.get('actives.my-sidebar.component'), componentA);

});

test('earlier shown source takes back over when later source clears', function(assert) {
  let service = this.subject();
  let componentA = {};
  let componentB = {};

  run(() => {
    service.show('sourceA', 'my-sidebar', componentA);
    service.show('sourceB', 'my-sidebar', componentB);
  });

  assert.equal(service.get('actives.my-sidebar.component'), componentB);

  run(() => {
    service.clear('sourceB');
  });

  assert.equal(service.get('actives.my-sidebar.component'), componentA);

});
