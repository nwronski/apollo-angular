var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { RxObservableQuery } from 'apollo-client-rxjs/index';
var ApolloQueryObservable = (function (_super) {
    __extends(ApolloQueryObservable, _super);
    function ApolloQueryObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ApolloQueryObservable;
}(RxObservableQuery));
export { ApolloQueryObservable };
//# sourceMappingURL=ApolloQueryObservable.js.map