# Deprecations

Follow this guide to resolve any deprecations you may see in your app.
If your project does not directly depend on `ember-elsewhere` and you
see a deprecation warning, look at your `npm-lockfile` or `yarn.lock` to see
which of your dependencies may be using ember-elsewhere, and
file an issue for that addon.

## send-component-hash

_removed in version 2.0.0_

If you need to `send` a component, you should not put it inside a hash helper.
Hashes of non-component content may be passed to `params` instead.

For example, this is deprecated:

```hbs
{{!-- curly component invocation example --}}
{{to-elsewhere named="my-target"
    send=(hash myComponent=(component "my-component")) foo="foo" bar="bar"}}

{{!-- angle bracket component invocation example --}}
<ToElsewhere @named="my-target" 
    send={{hash @myComponent=(component "my-component")) @foo="foo" @bar="bar"}}
/>
```

To resolve this deprecation, `send` only the component and put the rest of the
content into `params`:

```hbs
{{to-elsewhere named="my-target"
    send=(component "my-component") 
    params=(hash foo="foo" bar="bar"}}

<ToElsewhere @named="my-target"
    @send={{component "my-component"}}
    @params={{hash foo="foo" bar="bar"}}
/>
```

The params attribute can now be used in the `from-elsewhere` block like this:

```hbs
{{#from-elsewhere name="my-target" as |content params|}}
    {{params.foo}} 
    {{component content baz=params.bar}} 
{{/from-elsewhere}}

<FromElsewhere @name="my-target" as |content params|}}
    {{params.foo}} 
    {{component content baz=params.bar}} 
{{/FromElsewhere}}
```

The old behavior was deprecated because it is incompatible with tree-shaking
features of build systems like [Embroider](https://github.com/embroider-build/embroider).
