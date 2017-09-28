import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['modal-target'],
  backgroundAnimation
});

function backgroundAnimation() {
  return this.lookup('cross-fade').call(this, { maxOpacity: 0.5 });
}
