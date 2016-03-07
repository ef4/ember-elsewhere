import Ember from 'ember';
const { A, Service, run, Object: EmObject } = Ember;

export default Service.extend({
  init() {
    this._super();
    this.set('actives', EmObject.create());
    this._showQueue = A();
    this._clearQueue = A();
  },
  show(name, component) {
    this._showQueue.push({ name, component });
    this._schedule();
  },
  clear(name) {
    this._clearQueue.push(name);
    this._schedule();
  },
  _schedule() {
    run.scheduleOnce('afterRender', this, this._process);
  },
  _process() {
    let actives = this.get('actives');
    let clear = this._clearQueue;
    let show = this._showQueue;
    this._clearQueue = A();
    this._showQueue = A();
    clear.forEach(name => {
      actives.set(name || 'default', null);
    });
    show.forEach(({ name, component }) => {
      actives.set(name || 'default', component);
    });
  }
});
