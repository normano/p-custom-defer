# p-custom-defer

> Create a deferred promise

Forked from p-defer to add support for Custom Promise classes.

# Install

```
$ npm install p-custom-defer
```

# Usage

Look at the [test file](/test/index.ts) for examples.

## API

### pDefer()

Returns an `object` with a `promise` property and functions to `resolve()` and `reject()`.

### pDefer.custom(promiseCls, arg: any[])

Returns an `object` with a `promise` property and functions to `resolve()` and `reject()`. Promise will constructed using the user promise cls with args. Custom Promise class constructor must contain an executor argument at the end.

# Related

- [p-defer](https://github.com/sindresorhus/p-defer)
