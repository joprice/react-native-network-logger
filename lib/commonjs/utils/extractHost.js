"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const extractHost = url => {
  const host = url.split('//')[1]?.split(':')[0]?.split('/')[0] || undefined;
  return host;
};
var _default = exports.default = extractHost;
//# sourceMappingURL=extractHost.js.map