# Changelog

## 0.4.1

- BUGFIX: newer ember-cli-htmlbars to avoid build-time deprecation warning about calling super from init

## 0.4.0

 - BREAKING: to-elsewhere and from-elsewhere are now both tagless, since they don't need elements for anything and the divs just clutter up your DOM. This could potentially break your CSS when you upgrade from 0.3.0.
