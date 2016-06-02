import Ember from 'ember';
import layout from '../templates/components/in-sidebar';

export default Ember.Component.extend({
  layout,
  sidebars: Ember.inject.service('ember-sidebars'),
  willRender() {
    this.get('sidebars').show(Ember.guidFor(this), this.get('name'), this.get('show'), this.get('hooks'));
  },
  willDestroyElement() {
    this.get('sidebars').clear(Ember.guidFor(this));
  }

});
