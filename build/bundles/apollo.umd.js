(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('apollo-client-rxjs/index'), require('apollo-client/index'), require('rxjs/observable/from'), require('rxjs/operator/observeOn'), require('rxjs/scheduler/queue'), require('rxjs/Observable')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'apollo-client-rxjs/index', 'apollo-client/index', 'rxjs/observable/from', 'rxjs/operator/observeOn', 'rxjs/scheduler/queue', 'rxjs/Observable'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.apollo = global.ng.apollo || {}),global.ng.core,global.apollo.rxjs,global.apollo,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Scheduler,global.Rx));
}(this, (function (exports,_angular_core,apolloClientRxjs_index,ApolloClient,rxjs_observable_from,rxjs_operator_observeOn,rxjs_scheduler_queue,rxjs_Observable) { 'use strict';

ApolloClient = 'default' in ApolloClient ? ApolloClient['default'] : ApolloClient;

var SelectPipe = (function () {
    function SelectPipe() {
    }
    /**
     * @param {?} obj
     * @param {?=} name
     * @return {?}
     */
    SelectPipe.prototype.transform = function (obj, name) {
        if (name === void 0) { name = ''; }
        if (obj && name !== '') {
            // for Apollo decorator
            if (obj[name]) {
                return obj[name];
            }
            // for Angular2Apollo.watchQuery
            if (obj.data && obj.data[name]) {
                return obj.data[name];
            }
        }
    };
    SelectPipe.decorators = [
        { type: _angular_core.Pipe, args: [{
                    name: 'select',
                },] },
    ];
    /**
     * @nocollapse
     */
    SelectPipe.ctorParameters = function () { return []; };
    return SelectPipe;
}());

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ApolloQueryObservable = (function (_super) {
    __extends$1(ApolloQueryObservable, _super);
    function ApolloQueryObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ApolloQueryObservable;
}(apolloClientRxjs_index.RxObservableQuery));

var CLIENT_MAP_WRAPPER = new _angular_core.InjectionToken('apollo/client-map-wrapper');
var CLIENT_MAP = new _angular_core.InjectionToken('apollo/client-map');

/**
 * @template T
 * @param {?} promiseFn
 * @return {?}
 */
function fromPromise(promiseFn) {
    return new rxjs_Observable.Observable(function (subscriber) {
        promiseFn()
            .then(function (result) {
            if (!subscriber.closed) {
                subscriber.next(result);
                subscriber.complete();
            }
        }, function (error) {
            if (!subscriber.closed) {
                subscriber.error(error);
            }
        });
        return function () { return subscriber.unsubscribe(); };
    });
}
/**
 * @template T
 * @param {?} obs
 * @return {?}
 */
function wrapWithZone(obs) {
    return rxjs_operator_observeOn.observeOn.call(obs, new ZoneScheduler(Zone.current));
}
var ZoneScheduler = (function () {
    /**
     * @param {?} zone
     */
    function ZoneScheduler(zone) {
        this.zone = zone;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    ZoneScheduler.prototype.schedule = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (this.zone.run(function () { return rxjs_scheduler_queue.queue.schedule.apply(rxjs_scheduler_queue.queue, args); }));
    };
    return ZoneScheduler;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Base class that handles ApolloClient
 */
var ApolloBase = (function () {
    /**
     * @param {?} client
     */
    function ApolloBase(client) {
        this.client = client;
    }
    /**
     * @template T
     * @param {?} options
     * @return {?}
     */
    ApolloBase.prototype.watchQuery = function (options) {
        return new ApolloQueryObservable(apolloClientRxjs_index.rxify(this.client.watchQuery)(options));
    };
    /**
     * @template T
     * @param {?} options
     * @return {?}
     */
    ApolloBase.prototype.query = function (options) {
        var _this = this;
        return wrapWithZone(fromPromise(function () { return _this.client.query(options); }));
    };
    /**
     * @template T
     * @param {?} options
     * @return {?}
     */
    ApolloBase.prototype.mutate = function (options) {
        var _this = this;
        return wrapWithZone(fromPromise(function () { return _this.client.mutate(options); }));
    };
    /**
     * @param {?} options
     * @return {?}
     */
    ApolloBase.prototype.subscribe = function (options) {
        return wrapWithZone(rxjs_observable_from.from(/** @type {?} */ (this.client.subscribe(options))));
    };
    /**
     * @return {?}
     */
    ApolloBase.prototype.getClient = function () {
        return this.client;
    };
    ApolloBase.decorators = [
        { type: _angular_core.Injectable },
    ];
    /**
     * @nocollapse
     */
    ApolloBase.ctorParameters = function () { return [
        { type: ApolloClient, },
    ]; };
    return ApolloBase;
}());
/**
 * Container service that works just like the ApolloBase but includes named ApolloClients
 */
var Apollo = (function (_super) {
    __extends(Apollo, _super);
    /**
     * @param {?} clientMap
     */
    function Apollo(clientMap) {
        var _this = _super.call(this, clientMap['default']) || this;
        _this.map = new Map();
        for (var name_1 in clientMap) {
            if (typeof name_1 === 'string' && name_1 !== 'default') {
                _this.map.set(name_1, new ApolloBase(clientMap[name_1]));
            }
        }
        return _this;
    }
    /**
     * @return {?}
     */
    Apollo.prototype.default = function () {
        return this;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    Apollo.prototype.use = function (name) {
        if (name === 'default') {
            return this.default();
        }
        return this.map.get(name);
    };
    Apollo.decorators = [
        { type: _angular_core.Injectable },
    ];
    /**
     * @nocollapse
     */
    Apollo.ctorParameters = function () { return [
        null,
    ]; };
    return Apollo;
}(ApolloBase));
/**
 * Invokes a ClientMapWrapper
 * @param {?} configWrapper
 * @return {?}
 */
function getClientMap(configWrapper) {
    var /** @type {?} */ config = configWrapper();
    if (config instanceof ApolloClient) {
        return { default: config };
    }
    return config;
}
/**
 * Provides a value for a map and a wrapper
 * @param {?} configWrapper
 * @return {?}
 */
function provideClientMap(configWrapper) {
    return [{
            provide: CLIENT_MAP_WRAPPER,
            useValue: configWrapper,
        }, {
            provide: CLIENT_MAP,
            useFactory: getClientMap,
            deps: [CLIENT_MAP_WRAPPER],
        }];
}
/**
 * Provides the Apollo service
 */
var provideApollo = {
    provide: Apollo,
    useFactory: createApollo,
    deps: [CLIENT_MAP],
};
/**
 * @param {?} clientMap
 * @return {?}
 */
function createApollo(clientMap) {
    return new Apollo(clientMap);
}

var APOLLO_DIRECTIVES = [
    SelectPipe,
];
var APOLLO_PROVIDERS = [
    provideApollo,
];
/**
 * @param {?} clientFn
 * @return {?}
 */
function defaultApolloClient(clientFn) {
    return provideClientMap(clientFn);
}
var ApolloModule = (function () {
    function ApolloModule() {
    }
    /**
     * @param {?} clientFn
     * @return {?}
     */
    ApolloModule.withClient = function (clientFn) {
        return {
            ngModule: ApolloModule,
            providers: [
                APOLLO_PROVIDERS,
                defaultApolloClient(clientFn),
            ],
        };
    };
    /**
     * Defines a map of ApolloClients or a single instance
     * @param {?} clientMapFn
     * @return {?}
     */
    ApolloModule.forRoot = function (clientMapFn) {
        return {
            ngModule: ApolloModule,
            providers: [
                APOLLO_PROVIDERS,
                provideClientMap(clientMapFn),
            ],
        };
    };
    ApolloModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    declarations: APOLLO_DIRECTIVES,
                    exports: APOLLO_DIRECTIVES,
                },] },
    ];
    /**
     * @nocollapse
     */
    ApolloModule.ctorParameters = function () { return []; };
    return ApolloModule;
}());

exports.SelectPipe = SelectPipe;
exports.Apollo = Apollo;
exports.ApolloBase = ApolloBase;
exports.provideClientMap = provideClientMap;
exports.ApolloQueryObservable = ApolloQueryObservable;
exports.CLIENT_MAP = CLIENT_MAP;
exports.CLIENT_MAP_WRAPPER = CLIENT_MAP_WRAPPER;
exports.ApolloModule = ApolloModule;
exports.APOLLO_PROVIDERS = APOLLO_PROVIDERS;
exports.APOLLO_DIRECTIVES = APOLLO_DIRECTIVES;
exports.defaultApolloClient = defaultApolloClient;

Object.defineProperty(exports, '__esModule', { value: true });

})));
