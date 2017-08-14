var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import './_common';
import { NgModule, Component, destroyPlatform, getPlatform, ApplicationRef, CompilerFactory, } from '@angular/core';
import { ServerModule, renderModule, renderModuleFactory, INITIAL_CONFIG, PlatformState, platformDynamicServer, } from '@angular/platform-server';
import { async, TestBed, getTestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ServerTestingModule, platformServerTesting, } from '@angular/platform-server/testing';
import { BrowserModule, ɵgetDOM } from '@angular/platform-browser';
import { filter } from 'rxjs/operator/filter';
import { first } from 'rxjs/operator/first';
import { toPromise } from 'rxjs/operator/toPromise';
import gql from 'graphql-tag/index';
import 'rxjs/add/operator/take';
import { ApolloModule, Apollo, APOLLO_PROVIDERS, provideClientMap } from '../src/index';
import { mockClient, mockClientWithSub } from './_mocks';
import { subscribeAndCount } from './_utils';
describe('integration', function () {
    beforeEach(function () {
        if (getPlatform()) {
            destroyPlatform();
        }
    });
    xdescribe('render', function () {
        var /** @type {?} */ doc;
        var /** @type {?} */ called;
        // Mock GraphQL endpoint
        var /** @type {?} */ query = (_a = ["\n      query websiteInfo {\n        website {\n          status\n        }\n      }\n    "], _a.raw = ["\n      query websiteInfo {\n        website {\n          status\n        }\n      }\n    "], gql(_a));
        var /** @type {?} */ data = {
            website: {
                status: 'online',
            },
        };
        var /** @type {?} */ client = mockClient({
            request: { query: query },
            result: { data: data },
            delay: 500,
        });
        /**
         * @return {?}
         */
        function provideClient() {
            return client;
        }
        var AsyncServerApp = (function () {
            /**
             * @param {?} apollo
             */
            function AsyncServerApp(apollo) {
                this.apollo = apollo;
                this.text = '';
            }
            /**
             * @return {?}
             */
            AsyncServerApp.prototype.ngOnInit = function () {
                var _this = this;
                this.apollo.query({ query: query })
                    .take(1)
                    .subscribe(function (result) {
                    _this.text = result.data.website.status;
                });
            };
            AsyncServerApp.decorators = [
                { type: Component, args: [{
                            selector: 'app',
                            template: 'Website: {{text}}',
                        },] },
            ];
            /**
             * @nocollapse
             */
            AsyncServerApp.ctorParameters = function () { return [
                { type: Apollo, },
            ]; };
            return AsyncServerApp;
        }());
        function AsyncServerApp_tsickle_Closure_declarations() {
            /** @type {?} */
            AsyncServerApp.decorators;
            /**
             * @nocollapse
             * @type {?}
             */
            AsyncServerApp.ctorParameters;
            /** @type {?} */
            AsyncServerApp.prototype.text;
            /** @type {?} */
            AsyncServerApp.prototype.apollo;
        }
        var AsyncServerModule = (function () {
            function AsyncServerModule() {
            }
            AsyncServerModule.decorators = [
                { type: NgModule, args: [{
                            declarations: [AsyncServerApp],
                            imports: [
                                BrowserModule.withServerTransition({ appId: 'async-server' }),
                                ServerModule,
                                ApolloModule.withClient(provideClient),
                            ],
                            bootstrap: [AsyncServerApp],
                        },] },
            ];
            /**
             * @nocollapse
             */
            AsyncServerModule.ctorParameters = function () { return []; };
            return AsyncServerModule;
        }());
        function AsyncServerModule_tsickle_Closure_declarations() {
            /** @type {?} */
            AsyncServerModule.decorators;
            /**
             * @nocollapse
             * @type {?}
             */
            AsyncServerModule.ctorParameters;
        }
        beforeEach(function () {
            doc = '<html><head></head><body><app></app></body></html>';
            called = false;
        });
        afterEach(function () { expect(called).toBe(true); });
        test('using long form should work', async(function () { return __awaiter(_this, void 0, void 0, function () {
            var platform;
            return __generator(this, function (_a) {
                platform = platformDynamicServer([{ provide: INITIAL_CONFIG, useValue: { document: doc } }]);
                platform.bootstrapModule(AsyncServerModule)
                    .then(function (moduleRef) {
                    var /** @type {?} */ applicationRef = moduleRef.injector.get(ApplicationRef);
                    return toPromise.call(first.call(filter.call(applicationRef.isStable, function (isStable) { return isStable; })));
                })
                    .then(function () {
                    var /** @type {?} */ str = platform.injector.get(PlatformState).renderToString();
                    expect(clearNgVersion(str)).toMatchSnapshot();
                    platform.destroy();
                    called = true;
                });
                return [2 /*return*/];
            });
        }); }));
        test('using renderModule should work', async(function () {
            renderModule(AsyncServerModule, { document: doc }).then(function (output) {
                expect(clearNgVersion(output)).toMatchSnapshot();
                called = true;
            });
        }));
        test('using renderModuleFactory should work', async(function () {
            var /** @type {?} */ platform = platformDynamicServer([{ provide: INITIAL_CONFIG, useValue: { document: doc } }]);
            var /** @type {?} */ compilerFactory = platform.injector.get(CompilerFactory, null);
            var /** @type {?} */ moduleFactory = compilerFactory
                .createCompiler()
                .compileModuleSync(AsyncServerModule);
            renderModuleFactory(moduleFactory, { document: doc }).then(function (output) {
                expect(clearNgVersion(output)).toMatchSnapshot();
                called = true;
            });
        }));
        var _a;
    });
    describe('subscriptions', function () {
        var /** @type {?} */ fixture;
        test('should update the UI', function (done) {
            var /** @type {?} */ query = (_a = ["query heroes {\n        allHeroes {\n          id\n          name\n        }\n      }"], _a.raw = ["query heroes {\n        allHeroes {\n          id\n          name\n        }\n      }"], gql(_a));
            var /** @type {?} */ querySub = (_b = ["subscription addedHero {\n        addedHero {\n          id\n          name\n        }\n      }"], _b.raw = ["subscription addedHero {\n        addedHero {\n          id\n          name\n        }\n      }"], gql(_b));
            var /** @type {?} */ data = { allHeroes: [{ id: 1, name: 'Foo' }] };
            var /** @type {?} */ dataSub = { addedHero: { id: 2, name: 'Bar' } };
            var /** @type {?} */ client = mockClientWithSub([{
                    request: { query: querySub },
                    results: [{ result: /** @type {?} */ (dataSub) }],
                    id: 1,
                }], [{
                    request: { query: query },
                    result: { data: data },
                }]);
            var HeroesComponent = (function () {
                /**
                 * @param {?} apollo
                 */
                function HeroesComponent(apollo) {
                    this.apollo = apollo;
                    this.heroes = [];
                }
                /**
                 * @return {?}
                 */
                HeroesComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var /** @type {?} */ obs = this.apollo.watchQuery({ query: query });
                    subscribeAndCount(done, obs, function (handleCount, result) {
                        _this.heroes = result.data.allHeroes;
                        if (handleCount === 1) {
                            _this.pushNewHero();
                        }
                        else if (handleCount === 2) {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, fixture.whenStable()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, fixture.detectChanges()];
                                        case 2:
                                            _a.sent();
                                            expect(getHTML()).toMatchSnapshot();
                                            done();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 200);
                        }
                    });
                    this.apollo.subscribe({ query: querySub }).subscribe(function (result) {
                        obs.updateQuery(function (prev) {
                            var /** @type {?} */ allHeroes = prev.allHeroes.concat([result.addedHero]);
                            return __assign({}, prev, { allHeroes: allHeroes });
                        });
                    });
                };
                /**
                 * @return {?}
                 */
                HeroesComponent.prototype.pushNewHero = function () {
                    client['networkInterface'].fireResult(1);
                };
                HeroesComponent.decorators = [
                    { type: Component, args: [{
                                selector: 'app-heroes',
                                template: '<ul><li *ngFor="let hero of heroes">{{hero.name}}</li></ul>',
                            },] },
                ];
                /**
                 * @nocollapse
                 */
                HeroesComponent.ctorParameters = function () { return [
                    { type: Apollo, },
                ]; };
                return HeroesComponent;
            }());
            function HeroesComponent_tsickle_Closure_declarations() {
                /** @type {?} */
                HeroesComponent.decorators;
                /**
                 * @nocollapse
                 * @type {?}
                 */
                HeroesComponent.ctorParameters;
                /** @type {?} */
                HeroesComponent.prototype.heroes;
                /** @type {?} */
                HeroesComponent.prototype.apollo;
            }
            getTestBed().initTestEnvironment(ServerTestingModule, platformServerTesting());
            getTestBed().configureTestingModule({
                declarations: [HeroesComponent],
                providers: [
                    { provide: ComponentFixtureAutoDetect, useValue: true },
                    APOLLO_PROVIDERS,
                    provideClientMap(function () { return client; }),
                ],
            });
            fixture = TestBed.createComponent(HeroesComponent);
            /**
             * @return {?}
             */
            function getHTML() {
                return clearHTML(ɵgetDOM().getInnerHTML(fixture.nativeElement).trim());
            }
            var _a, _b;
        });
    });
});
/**
 * @param {?} html
 * @return {?}
 */
function clearNgVersion(html) {
    return html.replace(/ng-version=\"[^"]+\"/, '');
}
/**
 * @param {?} html
 * @return {?}
 */
function clearHTML(html) {
    return html.replace(/\<\!--[^>]+--\>/, '');
}
//# sourceMappingURL=integration.spec.js.map