import Service from '@ember/service';
import { run } from '@ember/runloop';
import EmObject from '@ember/object';
import { A as emArray } from '@ember/array';

export default Service.extend({
  init() {
    this._super();
    this.set('actives', EmObject.create());
    this._alive = {};
    this._counter = 1;
  },

  show(sourceId, name, component, outsideParams, order = 0) {
    // if current component has specific order that is greater than current internal count
    // update internal count so any subsequent component that does not provide order will
    // be after.
    if (this._counter < order) {
      this._counter = order + 1
    }
    this._alive[sourceId] = {
      target: name || 'default',
      component,
      order: order || this._counter++,
      outsideParams
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
    if (this.isDestroying || this.isDestroyed) {
      return;
    }

    let newActives = {};
    let alive = this._alive;

    Object.keys(alive).forEach((sourceId) => {
      let { target, component, order, outsideParams } = alive[sourceId];
      newActives[target] = newActives[target] || emArray();
      let newActive = component ? { component, order, outsideParams } : null;
      newActives[target].push(newActive);
    });
    Object.keys(newActives).forEach((target) => {
      newActives[target] = emArray(newActives[target].sortBy('order'));
    });

    this.set('actives', EmObject.create(newActives));
  }
});
