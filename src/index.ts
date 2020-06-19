export interface DeferredPromise<ResolveType> {
	/**
	Resolves the promise with a value or the result of another promise.
	@param value - The value to resolve the promise with.
	*/
	resolve(value?: ResolveType | PromiseLike<ResolveType>): void;

	/**
	Reject the promise with a provided reason or error.
	@param reason - The reason or error to reject the promise with.
	*/
	reject(reason?: unknown): void;

	/**
	The deferred promise.
	*/
	promise: Promise<ResolveType>;
}

export default function pDefer<ResolveType>() {

	const deferred: DeferredPromise<ResolveType> = {
    "promise": null,
    "resolve": null,
    "reject": null,
	};

	deferred.promise = new Promise((resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});

	return deferred;
};

/**
 * Custom Promise class must contain executor at the end of the constrector
 */
pDefer.custom = function customDefer<ResolveType>(
	customPromiseCls: new (...args: any) => Promise<ResolveType>,
	varArgs?: any[],
) {

  const deferred: DeferredPromise<ResolveType> = {
    "promise": null,
    "resolve": null,
    "reject": null,
	};

	const executor = (resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	};

	if(varArgs) {
		let args = varArgs.slice();
		args.push(executor);
		args.unshift(null);

		deferred.promise = new (Function.prototype.bind.apply(customPromiseCls, args));
	} else {

		deferred.promise = new customPromiseCls(executor);
	}

  return deferred;
};
