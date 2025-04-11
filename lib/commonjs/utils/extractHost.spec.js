"use strict";

var _extractHost = _interopRequireDefault(require("./extractHost"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('extractHost', () => {
  it('should extract host from basic url', () => {
    const host = (0, _extractHost.default)('http://something.test.com/hello');
    expect(host).toEqual('something.test.com');
  });
  it('should extract host from url with port', () => {
    const host = (0, _extractHost.default)('http://something.test.com:123/hello');
    expect(host).toEqual('something.test.com');
  });
  it('should extract host from ip', () => {
    const host = (0, _extractHost.default)('http://192.168.1.1/hello');
    expect(host).toEqual('192.168.1.1');
  });
  it('should extract host from ip with port', () => {
    const host = (0, _extractHost.default)('http://192.168.1.1:123/hello');
    expect(host).toEqual('192.168.1.1');
  });
  it('should return undefined for an invalid url', () => {
    const host = (0, _extractHost.default)('invalid-url');
    expect(host).toBeUndefined();
  });
});
//# sourceMappingURL=extractHost.spec.js.map