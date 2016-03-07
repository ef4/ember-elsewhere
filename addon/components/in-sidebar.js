import Ember from 'ember';
import layout from '../templates/components/in-sidebar';

export default Ember.Component.extend({
  layout,
  sidebars: Ember.inject.service('ember-sidebars'),
  willRender() {
    this.get('sidebars').show(this.get('name'), this.get('show'));
  },
  willDestroyElement() {
    this.get('sidebars').clear(this.get('name'));
  }

});
