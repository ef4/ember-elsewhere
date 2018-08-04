# Changelog

## 1.0.5

 - BUGFIX: workaround an issue in Ember 3.3+
 - HOUSEKEEPING: update test dependencies to ember-cli 3.3, etc.

## 1.0.4

 - ENHANCEMENT: warn on commonly misnamed parameter
 - BUGFIX: workaround travis chrome sandboxing issue

## 1.0.3

 - ENHANCEMENT: improved fastboot support and test coverage

## 1.0.2

 - HOUSEKEEPING: update ember-cli, etc

## 1.0.1

 - BUGFIX: guard against access after destruction
 - BUGFIX: fastboot compat

## 1.0.0

 - FEATURE: new multiple-from-elsewhere component by @vladucu
 - I'm naming this 1.0.0 because the public API has remained stable for a while.

## 0.4.1

- BUGFIX: newer ember-cli-htmlbars to avoid build-time deprecation warning about calling super from init

## 0.4.0

 - BREAKING: to-elsewhere and from-elsewhere are now both tagless, since they don't need elements for anything and the divs just clutter up your DOM. This could potentially break your CSS when you upgrade from 0.3.0.
