import Component from '@glimmer/component';

export default class extends Component {
  modalAnimation = modalAnimation;
}

function modalAnimation() {
  return this.lookup('explode').call(
    this,
    {
      pick: '.modal-background',
      use: ['fade', { maxOpacity: 0.5 }],
    },
    {
      pick: '.modal-dialog',
      use: 'to-left',
    }
  );
}
