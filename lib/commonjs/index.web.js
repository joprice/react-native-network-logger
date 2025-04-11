"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ThemeName", {
  enumerable: true,
  get: function () {
    return _theme.ThemeName;
  }
});
exports.default = exports.clearRequests = void 0;
Object.defineProperty(exports, "getBackHandler", {
  enumerable: true,
  get: function () {
    return _backHandler.getBackHandler;
  }
});
exports.startNetworkLogging = exports.getRequests = void 0;
var _backHandler = require("./backHandler");
var _theme = require("./theme");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const startNetworkLogging = options => {
  console.warn('startNetworkLogging is not implemented on this platform');
};
exports.startNetworkLogging = startNetworkLogging;
const getRequests = () => [];
exports.getRequests = getRequests;
const clearRequests = () => {};
exports.clearRequests = clearRequests;
var _default = () => null;
exports.default = _default;
//# sourceMappingURL=index.web.js.map