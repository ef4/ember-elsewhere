import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/to-elsewhere';

export default Component.extend({
  layout,
  service: service('ember-elsewhere'),
  tagName: '',
  didReceiveAttrs() {
    if (this.get('name')) {
      throw new Error(`to-elsewhere takes a "named=" parameter, not "name="`);
    }
    this.get('service').show(guidFor(this), this.get('named'), this.get('send'), this.get('params'));
  },
  willDestroyElement() {
    this.get('service').clear(guidFor(this));
  }

});
