import Ember from 'ember';
import layout from '../templates/components/show-sidebar';

export default Ember.Component.extend({
  sidebars: Ember.inject.service('ember-sidebars'),
  layout,
  _name: Ember.computed('name', function() {
    return this.get('name') || 'default';
  })
});
