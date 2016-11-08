# ember-elsewhere

[![NPM][npm-badge-img]][npm-badge-link]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]
![Ember Version][ember-version]

This addon makes it easy to manage sidebars, toolbars, popups, modals, or any piece of DOM that you want to lift outside your normal route hiearchy.

It is similar to [ember-wormhole](https://github.com/yapplabs/ember-wormhole), but is a better choice when your target is within your own Ember app (as opposed to arbitrary, potentially foreign DOM). It is also easier to compose with animations and it's based on 100% public API.

The best documentation is the sample application in `tests/dummy`, which is also running at [http://ef4.github.io/ember-elsewhere/](http://ef4.github.io/ember-elsewhere/).

## Install

```no-highlight
ember install ember-elsewhere
```

## Components

Create a target named "my-right-sidebar":

```hbs
{{from-elsewhere name="my-right-sidebar"}}
```

Anywhere else in your app, declare which component should render in the target -- complete with bound inputs and actions:

```hbs
{{to-elsewhere named="my-right-sidebar" send=(component "cool-thing" model=model launch=(action "launchIt"))}}
```

For fancier behaviors, you can use the block form of `{{#from-elsewhere}}`, which gives you an opportunity to extend the target's behavior in arbitrary ways. For example, this lets your target animate as its content changes:

```hbs
{{#from-elsewhere name="modal" as |modal|}}
  {{#liquid-bind modal as |currentModal|}}
    <div class="modal-background"></div>
    <div class="modal-container">
      {{component modal}}
    </div>
  {{/liquid-bind}}
{{/from-elsewhere}}
```

## Passing additional state through to the target

When you're using the block form of `from-elsewhere`, it's entirely up to you what value you send to the target. It can be more than just a component. Here is a complete example of an animatable modal that supports an `onOutsideClick` action while providing shared layout for the background and container:

```hbs
{{to-elsewhere named="modal"
               send=(hash body=(component "warning-message")
                          onOutsideClick=(action "close")) }}
```

```hbs
{{#from-elsewhere name="modal" as |modal|}}
  {{#liquid-bind modal as |currentModal|}}
    <div class="modal-container">
      <div class="modal-background" onclick={{action currentModal.onOutsideClick}}></div>
      <div class="modal-dialog" >
        {{component currentModal.body}}
      </div>
    </div>
  {{/liquid-bind}}
{{/from-elsewhere}}
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

[npm-badge-img]: https://badge.fury.io/js/ember-elsewhere.svg
[npm-badge-link]: http://badge.fury.io/js/ember-elsewhere
[ember-observer-badge]: http://emberobserver.com/badges/ember-elsewhere.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-elsewhere
[ember-version]: https://embadge.io/v1/badge.svg?start=2.3.2
