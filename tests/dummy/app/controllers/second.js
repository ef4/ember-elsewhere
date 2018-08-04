import { A } from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('handled', A());
  },
  actions: {
    handleIt() {
      this.get('handled').pushObject("I handled an event");
    }
  }
});
