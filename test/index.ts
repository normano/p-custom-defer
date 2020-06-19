import test from 'ava';
import pDefer from '../src';

const fixture = Symbol('fixture');

class FooPromise<T> extends Promise<T> {
	constructor(executor) {
		super(executor);
	}
}

class FooTwoArgsPromise<T> extends Promise<T> {
	constructor(
		executor,
		public no: number,
	) {
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

function customTwoArgsDelay(ms: number, no: number): FooTwoArgsPromise<Symbol> {
	const deferred = pDefer.custom<Symbol>(FooTwoArgsPromise, [no]);
	setTimeout(deferred.resolve, ms, fixture);

	return <FooTwoArgsPromise<Symbol>> deferred.promise;
}

test('main', async t => {
	t.is(await mainDelay(50), fixture);
});

test('custom defer', async t => {
	t.is(await customDelay(50), fixture);
});

test('custom twoargs defer', async t => {

	const promise = customTwoArgsDelay(50, 5);

	t.is(promise.no, 5);
	t.is(await promise, fixture);
});
