import { guidFor } from '@ember/object/internals';
import { inject } from '@ember/service';
import Component from '@glimmer/component';

export default class extends Component {
  @inject('ember-elsewhere') service;

  get sideEffect() {
    if (this.args.name) {
      throw new Error(`to-elsewhere takes a "named=" parameter, not "name="`);
    }
    this.service.show(
      guidFor(this),
      this.args.named,
      this.args.send,
      this.args.outsideParams,
      this.args.order
    );
    return undefined;
  }

  willDestroy() {
    super.willDestroy();
    this.service.clear(guidFor(this));
  }
}
