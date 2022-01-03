import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  service: service('ember-elsewhere'),
  tagName: '',

  didReceiveAttrs() {
    if (this.name) {
      throw new Error(`to-elsewhere takes a "named=" parameter, not "name="`);
    }
    this.service.show(guidFor(this), this.named, this.send, this.outsideParams, this.order);
  },

  willDestroyElement() {
    this.service.clear(guidFor(this));
  }
});
