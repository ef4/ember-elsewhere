import Ember from 'ember';
const { Service, run, Object: EmObject } = Ember;

export default Service.extend({
  init() {
    this._super();
    this.set('actives', EmObject.create());
    this._alive = {};
    this._counter = 1;
  },
  show(sourceId, name, component, hooks) {
    this._alive[sourceId] = {
      target: name || 'default',
      component,
      hooks,
      order: this._counter++
    };
    this._schedule();
  },
  clear(sourceId) {
    delete this._alive[sourceId];
    this._schedule();
  },
  _schedule() {
    run.scheduleOnce('afterRender', this, this._process);
  },
  _process() {
    let newActives = {};
    let alive = this._alive;

    Object.keys(alive).forEach(sourceId => {
      let { target, component, hooks, order } = alive[sourceId];
      let existing = newActives[target];
      if (!existing || existing.order < order) {
        newActives[target] = component ? { component, hooks, order } : null;
      }
    });
    this.set('actives', EmObject.create(newActives));
  }
});
