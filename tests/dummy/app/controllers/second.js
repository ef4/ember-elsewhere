import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this.set('handled', Ember.A());
  },
  actions: {
    handleIt() {
      this.get('handled').pushObject("I handled an event");
    }
  }
});
