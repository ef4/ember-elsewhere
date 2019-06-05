import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/to-elsewhere';
import { deprecate } from '@ember/application/deprecations';

export default Component.extend({
  layout,
  service: service('ember-elsewhere'),
  tagName: '',
  didReceiveAttrs() {
    if (this.get('name')) {
      throw new Error(`to-elsewhere takes a "named=" parameter, not "name="`);
    }
    this.checkForDeprecations();
    this.get('service').show(guidFor(this), this.get('named'), this.get('send'), this.get('params'));
  },
  willDestroyElement() {
    this.get('service').clear(guidFor(this));
  },
  checkForDeprecations() {
    // typeof null is object, so we need to check for it explicitly
    if (this.send && typeof this.send === 'object' ) {
      for (let key in this.send) {
        const isAComponent = this.send[key].inner && this.send[key].inner.hasOwnProperty('ComponentClass');
        if (isAComponent) {
          // show deprecation warning if someone does `send=(hash a=(component "my-component"))`
          deprecate(`Sending a component inside a hash is deprecated in the ember-elsewhere addon. Use params instead to provide a hash of content. For example, send=(component "my-component") params=(hash foo="foo" bar="bar")`, 
            false,
            {
              id: 'send-component-hash',
              until: '2.0.0',
              url: 'https://github.com/ef4/ember-elsewhere/blob/master/DEPRECATIONS.md'
            }
          );
        }
      }
    }
  }
});
