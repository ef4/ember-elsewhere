export default function() {
  this.transition(
    this.inHelper('liquid-bind'),
    this.fromValue(false),
    this.toValue(true),
    this.use('to-down'),
    this.reverse('to-up')
  );
  this.transition(
    this.inHelper('liquid-bind'),
    this.fromValue(true),
    this.toValue(true),
    this.use('fade')
  );
}
