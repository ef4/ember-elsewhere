import EmberObject from '@ember/object';
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return EmberObject.create({
      title: "Welcome"
    });
  }
});
