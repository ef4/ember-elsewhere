import Ember from 'ember';
import layout from '../templates/components/in-sidebar';

export default Ember.Component.extend({
  layout,
  service: Ember.inject.service('ember-elsewhere'),
  willRender() {
    this.get('service').show(Ember.guidFor(this), this.get('name'), this.get('show'), this.get('hooks'));
  },
  willDestroyElement() {
    this.get('service').clear(Ember.guidFor(this));
  }

});
