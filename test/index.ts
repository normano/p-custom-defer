import test from 'ava';
import pDefer from '../src';

const fixture = Symbol('fixture');

class FooPromise<T> extends Promise<T> {
	constructor(executor) {
			super(executor);
	}
}

function mainDelay(ms: number) {
	const deferred = pDefer<Symbol>();
	setTimeout(deferred.resolve, ms, fixture);
	return deferred.promise;
}

function customDelay(ms: number) {
	const deferred = pDefer.custom<Symbol>(FooPromise);
	setTimeout(deferred.resolve, ms, fixture);
	return deferred.promise;
}

test('main', async t => {
	t.is(await mainDelay(50), fixture);
});

test('custom defer', async t => {
	t.is(await customDelay(50), fixture);
});
