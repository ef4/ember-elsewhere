import ShowSidebar from './show-sidebar';
import layout from '../templates/components/with-sidebar';
import Ember from 'ember';

export default ShowSidebar.extend({
  layout,

  // We don't yield any content on the very first render pass, because
  // we want to give any concurrent {{in-sidebar}} components a chance
  // to declare their intentions first. This allows the components
  // inside us to see a meaningful initial value on their initial
  // render.
  initialized: false,
  didInsertElement() {
    this._super();
    Ember.run.schedule('afterRender', () => this.set('initialized', true));
  }
});
