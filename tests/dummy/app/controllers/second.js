import { A } from '@ember/array';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  handled = A();

  @action
  handleIt() {
    this.handled.pushObject('I handled an event');
  }
}
