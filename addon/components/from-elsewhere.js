import { getOwner } from '@ember/application';
import { schedule } from '@ember/runloop';
import { Promise } from 'rsvp';
import { inject } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @inject('ember-elsewhere') service;

  get name() {
    if (this.args.named) {
      throw new Error(
        `<FromElsewhere> takes a "@name=" parameter, not "@named="`
      );
    }
    return this.args.name ?? 'default';
  }

  // We don't yield any content on the very first render pass, because
  // we want to give any concurrent {{to-elsewhere}} components a chance
  // to declare their intentions first. This allows the components
  // inside us to see a meaningful initial value on their initial
  // render.
  @tracked
  initialized = false;

  constructor(...args) {
    super(...args);

    let promise = new Promise((resolve) => {
      schedule('afterRender', () => {
        this.initialized = true;
        resolve();
      });
    });

    let fastboot = getOwner(this).lookup('service:fastboot');
    if (fastboot && fastboot.isFastBoot) {
      fastboot.deferRendering(promise);
    }
  }
}
