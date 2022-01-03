import { getOwner } from '@ember/application';
import { schedule } from '@ember/runloop';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  service: service('ember-elsewhere'),
  tagName: '',

  didReceiveAttrs() {
    if (!this.name) {
      this.set('name', 'default');
    }
    if (this.named) {
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

    let promise = new Promise(resolve => {
      schedule('afterRender', () => {
        if (!this.isDestroyed) {
          this.set('initialized', true);
        }
        resolve();
      });
    });

    let fastboot = getOwner(this).lookup('service:fastboot');
    if (fastboot && fastboot.get("isFastBoot")) {
      fastboot.deferRendering(promise);
    }
  }
});
