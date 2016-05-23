# ember-sidebars

[![NPM][npm-badge-img]][npm-badge-link]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]
![Ember Version][ember-version]

This addon makes it easy to manage sidebars, toolbars, or any piece of DOM that you want to lift outside your normal route hiearchy.

It is similar to [ember-wormhole](https://github.com/yapplabs/ember-wormhole), but is more suitable when your target is your own Ember component (as opposed to arbitrary, potentially foreign DOM).

The best documentation is the sample application in `tests/dummy`, which is also running at [http://ef4.github.io/ember-sidebars/](http://ef4.github.io/ember-sidebars/).

## Install

```no-highlight
ember install ember-sidebars
```

## Components

Create a sidebar named "my-right-sidebar":

```hbs
{{show-sidebar name="my-right-sidebar"}}
```

From elsewhere, declare which component should render in the sidebar -- complete with bound inputs and actions:


```hbs
{{in-sidebar name="my-right-sidebar" show=(component "cool-thing" model=model launch=(action "launchIt"))}}
```

For fancier behaviors, you can use `{{#with-sidebar}}` instead of `{{show-sidebar}}` which gives you an opportunity to extend the sidebar's behavior in arbitrary ways. For example, this lets your sidebar animate as its content changes:

```hbs
{{#with-sidebar name="my-right-sidebar" as |sidebar|}}
  <div class="topbar">
    {{#liquid-bind sidebar as |currentSidebar|}}
      {{component currentSidebar}}
    {{/liquid-bind}}
  </div>
{{/with-sidebar}}
```

ember-sidebars is also a great way to do modals, since modals are just another thing that you want to render "elsewhere" in the DOM. [Here is a gist with an example.](https://gist.github.com/ef4/0bcc6f7c99dafffdf6cc)

## Passing additional state through to sidebar

Sometime you may want to pass an action or value into the sidebar that is accessible outside the closed-over component. There is an optional `hooks` argument for that.

```hbs
{{in-sidebar name="modal" component=(component "warning-message") hooks=(hash onOutsideClick=(action "close"))}}
```

```hbs
{{#with-sidebar name="modal" as |modalContent hooks|}}
  <div class="modal-container" onclick={{action hooks.onOutsideClick}}>
    <div class="modal-dialog" >
      {{component modalContent}}
    </div>
  </div>    
{{/with-sidebar}}
```

A more comprehensive example of the above modal behavior [is available here](https://gist.github.com/ef4/0bcc6f7c99dafffdf6cc).

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

[npm-badge-img]: https://badge.fury.io/js/ember-sidebars.svg
[npm-badge-link]: http://badge.fury.io/js/ember-sidebars
[ember-observer-badge]: http://emberobserver.com/badges/ember-sidebars.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-sidebars
[ember-version]: https://embadge.io/v1/badge.svg?start=1.13.0
