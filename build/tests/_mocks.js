import ApolloClient from 'apollo-client/index';
import { mockNetworkInterface, mockSubscriptionNetworkInterface, } from 'apollo-test-utils/index';
import { createApollo } from './_utils';
/**
 * @param {...?} args
 * @return {?}
 */
export function mockClient() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var /** @type {?} */ networkInterface = mockNetworkInterface.apply(void 0, args);
    return new ApolloClient({
        networkInterface: networkInterface,
        addTypename: false,
        dataIdFromObject: function (o) { return o['id']; },
    });
}
/**
 * @param {?} mSubs
 * @param {?} mRes
 * @return {?}
 */
export function mockClientWithSub(mSubs, mRes) {
    var /** @type {?} */ networkInterface = mockSubscriptionNetworkInterface.apply(void 0, [mSubs].concat(mRes));
    return new ApolloClient({
        networkInterface: networkInterface,
        addTypename: false,
        dataIdFromObject: function (o) { return o['id']; },
    });
}
/**
 * @param {...?} args
 * @return {?}
 */
export function mockApollo() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var /** @type {?} */ client = mockClient.apply(void 0, args);
    return createApollo({ default: client });
}
/**
 * @param {?} mSubs
 * @param {?} mRes
 * @return {?}
 */
export function mockApolloWithSub(mSubs, mRes) {
    var /** @type {?} */ client = mockClientWithSub(mSubs, mRes);
    return createApollo({ default: client });
}
//# sourceMappingURL=_mocks.js.map