"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearRequests = void 0;
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _NetworkLogger.default;
  }
});
Object.defineProperty(exports, "getBackHandler", {
  enumerable: true,
  get: function () {
    return _backHandler.getBackHandler;
  }
});
exports.stopNetworkLogging = exports.startNetworkLogging = exports.getRequests = void 0;
var _loggerSingleton = _interopRequireDefault(require("./loggerSingleton"));
var _NetworkLogger = _interopRequireDefault(require("./components/NetworkLogger"));
var _backHandler = require("./backHandler");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const startNetworkLogging = options => {
  _loggerSingleton.default.enableXHRInterception(options);
};
exports.startNetworkLogging = startNetworkLogging;
const stopNetworkLogging = () => {
  _loggerSingleton.default.disableXHRInterception();
};
exports.stopNetworkLogging = stopNetworkLogging;
const getRequests = () => _loggerSingleton.default.getRequests();
exports.getRequests = getRequests;
const clearRequests = () => _loggerSingleton.default.clearRequests();
exports.clearRequests = clearRequests;
//# sourceMappingURL=index.js.map