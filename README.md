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
<FromElsewhere @name="my-right-sidebar" />
```

Anywhere else in your app, declare which component should render in the target -- complete with bound inputs and actions:

```hbs
<ToElsewhere
  @named="my-right-sidebar"
  @send={{component "cool-thing"
    model=this.model
    launch=this.launchIt
  }}
/>
```

For fancier behaviors, you can use the block form of `<FromElsewhere>`, which gives you an opportunity to extend the target's behavior in arbitrary ways. For example, this lets your target animate as its content changes:

```hbs
<FromElsewhere @name="modal" as |modal|>
  {{#liquid-bind modal as |currentModal|}}
    <div class="modal-background"></div>
    <div class="modal-container">
      {{component modal}}
    </div>
  {{/liquid-bind}}
</FromElsewhere>
```

## Rendering multiple components into a single target

There might be use cases where you would like to render multiple components into a single target, for example a `<FromElsewhere>` "actions" might receive multiple action buttons via `<ToElsewhere>`. Instead of `<FromElsewhere/>` just use the complementary `<MultipleFromElsewhere>` component.

```hbs
<MultipleFromElsewhere @name="actions"/>
<!-- ... -->
<ToElsewhere @named="actions" @send={{component "test-button" text="Button1"}} />
<ToElsewhere @named="actions" @send={{component "test-button" text="Button2"}} />
<ToElsewhere @named="actions" @send={{component "test-button" text="Button3"}} />
```

## Passing additional state through to the target

When you're using the block form of `<FromElsewhere>`, it's entirely up to you what information you pass to the target. It can be more than just a component. Here is a complete example of an animatable modal that supports an `onOutsideClick` action while providing shared layout for the background and container:

```hbs
<ToElsewhere @named="modal"
             @send={{component "warning-message"}}
             @outsideParams={{hash onOutsideClick=this.close 
                                   title="modal title"}} />
```

```hbs
<FromElsewhere @name="modal" as |modal outsideParams|>
  {{#liquid-bind modal as |currentModal|}}
    <div class="modal-container">
      <div class="modal-background" {{on "click" outsideParams.onOutsideClick}}></div>
      <div class="modal-dialog" >
        <div class="modal-title">{{outsideParams.title}}</div>
        <currentModal />
      </div>
    </div>
  {{/liquid-bind}}
</FromElsewhere>
```

If you plan to `send` a component, you can use Ember's [component helper](https://guides.emberjs.com/release/components/defining-a-component/#toc_dynamically-rendering-a-component).
The component helper accepts the component name and other properties, such as `{{component "my-component-name" someValue="something"}}`, which will cover most use cases.
However, if you need to provide additional content to use outside of the component scope, that is when you can use the `outsideParams` attribute.

## Crossing Engines

Engines are deliberately isolated from each other, so a `<ToElsewhere>` in one engine cannot target a `<FromElsewhere>` in another. But you can optionally share the ember-elsewhere service between them to make it work, see https://github.com/ef4/ember-elsewhere/issues/26#issuecomment-432217049

## Ember's native in-element

Since Ember 3.21 there is also a native `in-element` helper. This helper offers less functionality than this addon,
but may be enough for some use-cases. [More details](https://api.emberjs.com/ember/3.21/classes/Ember.Templates.helpers/methods/in-element?anchor=in-element)

### Linting

* `ember server`
* Visit your app at http://localhost:4200.

### Running tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

[npm-badge-img]: https://badge.fury.io/js/ember-elsewhere.svg
[npm-badge-link]: http://badge.fury.io/js/ember-elsewhere
[ember-observer-badge]: http://emberobserver.com/badges/ember-elsewhere.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-elsewhere
[ember-version]: https://embadge.io/v1/badge.svg?start=2.3.2
