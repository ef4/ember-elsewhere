import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../templates/components/to-elsewhere';

export default Component.extend({
  layout,
  service: service('ember-elsewhere'),
  tagName: '',
  didReceiveAttrs() {
    if (get(this, 'name')) {
      throw new Error(`to-elsewhere takes a "named=" parameter, not "name="`);
    }
    get(this, 'service').show(guidFor(this), get(this, 'named'), get(this, 'send'), get(this, 'outsideParams'), get(this, 'order'));
  },
  willDestroyElement() {
    get(this, 'service').clear(guidFor(this));
  }

});
