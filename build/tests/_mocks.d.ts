import ApolloClient from 'apollo-client';
import { MockedSubscription, MockedResponse } from 'apollo-test-utils';
import { Apollo } from '../src/Apollo';
export declare function mockClient(...args: any[]): ApolloClient;
export declare function mockClientWithSub(mSubs: MockedSubscription[], mRes: MockedResponse[]): ApolloClient;
export declare function mockApollo(...args: any[]): Apollo;
export declare function mockApolloWithSub(mSubs: MockedSubscription[], mRes: MockedResponse[]): Apollo;
