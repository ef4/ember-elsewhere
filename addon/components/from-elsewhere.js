import layout from '../templates/components/from-elsewhere';
import Ember from 'ember';

export default Ember.Component.extend({
  layout,
  service: Ember.inject.service('ember-elsewhere'),

  didReceiveAttrs() {
    if (!this.get('name')) {
      this.set('name', 'default');
    }
  },

  // We don't yield any content on the very first render pass, because
  // we want to give any concurrent {{to-elsewhere}} components a chance
  // to declare their intentions first. This allows the components
  // inside us to see a meaningful initial value on their initial
  // render.
  initialized: false,
  didInsertElement() {
    this._super();
    Ember.run.schedule('afterRender', () => this.set('initialized', true));
  }
});
