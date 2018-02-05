import Ember from 'ember';
import layout from '../templates/components/to-elsewhere';

export default Ember.Component.extend({
  layout,
  service: Ember.inject.service('ember-elsewhere'),
  tagName: '',
  didReceiveAttrs() {
    if (this.get('name')) {
      throw new Error(`to-elsewhere takes a "named=" parameter, not "name="`);
    }
    this.get('service').show(Ember.guidFor(this), this.get('named'), this.get('send'));
  },
  willDestroyElement() {
    this.get('service').clear(Ember.guidFor(this));
  }

});
