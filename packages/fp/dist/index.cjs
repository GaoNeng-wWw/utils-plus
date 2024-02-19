'use strict';

function curry(fn) {
    const curried = (...args) => {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return curry(fn.bind(null, ...args));
    };
    return curried;
}

exports.curry = curry;
