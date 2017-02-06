(function (root) {

    'use strict';

    var STOPPED = 0;
    var STOPPING = 1;
    var RUNNING = 2;

    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function noop() {
    }

    function Malarkey(elem, opts) {

        // allow `Malarkey` to be called without the `new` keyword
        var self = this;
        if (!(self instanceof Malarkey)) {
            return new Malarkey(elem, opts);
        }

        // default `opts`
        opts = opts || {};
        var loop = opts.loop;
        var typeSpeed = opts.speed || opts.typeSpeed || 50;
        var deleteSpeed = opts.speed || opts.deleteSpeed || 50;
        var pauseDelay = opts.delay || opts.pauseDelay || 2000;
        var postfix = opts.postfix || '';
        var getter = opts.getter || function (elem) {
                return elem.innerHTML;
            };
        var setter = opts.setter || function (elem, val) {
                elem.innerHTML = val;
            };

        // the function queue
        var fnQueue = [];
        var argsQueue = [];
        var i = -1;
        var state = STOPPED;
        var pauseCb = noop;

        function enqueue(fn, args) {
            fnQueue.push(fn);
            argsQueue.push(args);
            if (state != RUNNING) {
                state = RUNNING;
                // wait for the remaining functions to be enqueued
                setTimeout(function () {
                    next();
                }, 0);
            }
            return self;
        }

        function next() {
            if (state != RUNNING) {
                state = STOPPED;
                pauseCb(elem);
                pauseCb = noop;
                return;
            }
            if (++i == fnQueue.length) {
                if (!loop) {
                    i = fnQueue.length - 1; // set `i` to the last element of `fnQueue`
                    state = STOPPED;
                    return;
                }
                i = 0;
            }
            fnQueue[i].apply(null, [].concat(next, argsQueue[i]));
        }

        // internal functions that are `enqueued` via the respective public methods
        function _type(cb, str, speed) {
            var len = str.length;
            if (!len) {
                return cb();
            }
            (function t(i) {
                setTimeout(function () {
                    setter(elem, getter(elem) + str[i]);
                    i += 1;
                    if (i < len) {
                        t(i);
                    } else {
                        cb();
                    }
                }, speed);
            })(0);
        }

        function _delete(cb, x, speed) {
            var curr = getter(elem);
            var count = curr.length; // default to deleting entire contents of `elem`
            if (x != null) {
                if (typeof x == 'string') {
                    // delete the string `x` if and only if `elem` ends with `x`
                    if (endsWith(curr, x + postfix)) {
                        count = x.length + postfix.length;
                    } else {
                        count = 0;
                    }
                } else {
                    // delete the last `x` characters from `elem`
                    if (x > -1) {
                        count = Math.min(x, count);
                    }
                }
            }
            if (!count) {
                return cb();
            }
            (function d(count) {
                setTimeout(function () {
                    var curr = getter(elem);
                    if (count) {
                        // drop last char
                        setter(elem, curr.substring(0, curr.length - 1));
                        d(count - 1);
                    } else {
                        cb();
                    }
                }, speed);
            })(count);
        }

        function _clear(cb) {
            setter(elem, '');
            cb();
        }

        function _call(cb, fn) {
            fn.call(cb, elem);
        }

        // expose the public methods
        self.type = function (str, speed) {
            return enqueue(_type, [str + postfix, speed || typeSpeed]);
        };
        self.delete = function (x, speed) {
            return enqueue(_delete, [x, speed || deleteSpeed]);
        };
        self.clear = function () {
            return enqueue(_clear);
        };
        self.pause = function (delay) {
            return enqueue(setTimeout, [delay || pauseDelay]);
        };
        self.call = function (fn) {
            return enqueue(_call, [fn]);
        };
        self.triggerPause = function (cb) {
            state = STOPPING;
            pauseCb = cb || noop;
            return self;
        };
        self.triggerResume = function () {
            if (state != RUNNING) { // ie. `STOPPED` or `STOPPING`
                var prevState = state;
                state = RUNNING;
                if (prevState == STOPPED) {
                    next();
                }
            }
            return self;
        };
        self.isRunning = function () {
            return state != STOPPED; // ie. `RUNNING` or `STOPPING`
        };

    }

    /* istanbul ignore else */
    if (typeof module == 'object') {
        module.exports = Malarkey;
    } else {
        root.malarkey = Malarkey;
    }

    var elem = document.querySelector('#banner-start-command');
    var opts = {
        typeSpeed: 80,
        deleteSpeed: 80,
        pauseDelay: 2000,
        loop: true,
        postfix: ''
    };
    var language = document.getElementsByTagName('html')[0].lang;
    if (language == 'zh-cn') {
        Malarkey(elem, opts)
            .type('2.0里程碑版本现已上线').pause().delete()
            .type('支持ActionRecord语法糖').pause().delete();
    } else {
        Malarkey(elem, opts)
            .type('2.0 version is coming now').pause().delete()
            .type('support ActionRecord syntactic sugar').pause().delete();
    }

})(this);
