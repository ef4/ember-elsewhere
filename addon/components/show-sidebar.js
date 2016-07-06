import Ember from 'ember';
import layout from '../templates/components/show-sidebar';

export default Ember.Component.extend({
  service: Ember.inject.service('ember-elsewhere'),
  layout,
  _name: Ember.computed('name', function() {
    return this.get('name') || 'default';
  })
});
