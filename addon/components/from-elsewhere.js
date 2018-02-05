import layout from '../templates/components/from-elsewhere';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  service: Ember.inject.service('ember-elsewhere'),
  tagName: '',

  didReceiveAttrs() {
    if (!this.get('name')) {
      this.set('name', 'default');
    }
    if (this.get('named')) {
      throw new Error(`from-elsewhere takes a "name" parameter, not "named"`);
    }
  },

  // We don't yield any content on the very first render pass, because
  // we want to give any concurrent {{to-elsewhere}} components a chance
  // to declare their intentions first. This allows the components
  // inside us to see a meaningful initial value on their initial
  // render.
  initialized: false,


  // we use init here instead of didInsertElement because we want to
  // take action even in fastboot.
  init() {
    this._super();

    let promise = new Ember.RSVP.Promise(resolve => {
      Ember.run.schedule('afterRender', () => {
        if (!this.isDestroyed) {
          this.set('initialized', true);
        }
        resolve();
      });
    });

    let fastboot = Ember.getOwner(this).lookup('service:fastboot');
    if (fastboot && fastboot.get("isFastBoot")) {
      fastboot.deferRendering(promise);
    }
  }

});
