import EmberObject from '@ember/object';
import Route from '@ember/routing/route';

export default class extends Route {
  model() {
    return EmberObject.create({
      title: 'Welcome',
    });
  }
}
