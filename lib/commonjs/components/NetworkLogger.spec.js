"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactNative = require("@testing-library/react-native");
var _NetworkLogger = _interopRequireDefault(require("./NetworkLogger"));
var _loggerSingleton = _interopRequireDefault(require("../loggerSingleton"));
var _NetworkRequestInfo = _interopRequireDefault(require("../NetworkRequestInfo"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
jest.mock('../loggerSingleton', () => ({
  isPaused: false,
  enabled: true,
  setCallback: jest.fn(),
  clearRequests: jest.fn(),
  onPausedChange: jest.fn(),
  getRequests: jest.fn().mockReturnValue([]),
  enableXHRInterception: jest.fn(),
  disableXHRInterception: jest.fn()
}));
jest.mock('react-native/Libraries/Blob/FileReader', () => ({}));
jest.mock('react-native/src/private/inspector/XHRInterceptor', () => ({
  isInterceptorEnabled: jest.fn(),
  setOpenCallback: jest.fn(),
  setRequestHeaderCallback: jest.fn(),
  setSendCallback: jest.fn(),
  setHeaderReceivedCallback: jest.fn(),
  setResponseCallback: jest.fn(),
  enableInterception: jest.fn()
}));
const MyNetworkLogger = props => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NetworkLogger.default, {
    ...props
  });
};
describe('max rows', () => {
  it('should stop adding new rows once maxRows is reached', () => {
    const requests = [];
    const spyOnLoggerSetCallback = jest.spyOn(_loggerSingleton.default, 'setCallback');
    const emitCallback = jest.fn();
    spyOnLoggerSetCallback.mockImplementation(callback => {
      return emitCallback.mockImplementation(id => {
        requests.unshift(new _NetworkRequestInfo.default(`${id}`, 'XMLHttpRequest', 'POST', `http://example.com/${id}`));
        return callback(requests);
      });
    });
    const {
      queryAllByText,
      queryByText
    } = (0, _reactNative.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(MyNetworkLogger, {
      maxRows: 2
    }));
    (0, _reactNative.act)(() => {
      emitCallback(1);
    });
    expect(queryAllByText(/example\.com/i)).toHaveLength(1);
    (0, _reactNative.act)(() => {
      emitCallback(2);
    });
    expect(queryAllByText(/example\.com/i)).toHaveLength(2);
    (0, _reactNative.act)(() => {
      emitCallback(3);
    });
    expect(queryAllByText(/example\.com/i)).not.toHaveLength(3);
    expect(queryByText(/example\.com\/3$/i)).toBeTruthy();
    expect(queryByText(/example\.com\/2$/i)).toBeTruthy();
    expect(queryByText(/example\.com\/1$/i)).toBeFalsy();
    spyOnLoggerSetCallback.mockRestore();
  });
});
describe('options', () => {
  it('should toggle the display of the paused banner when paused', async () => {
    const spyOnLoggerPauseRequests = jest.spyOn(_loggerSingleton.default, 'onPausedChange');
    const {
      getByText,
      queryByText,
      getByTestId,
      unmount
    } = (0, _reactNative.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(MyNetworkLogger, {}));
    _reactNative.fireEvent.press(getByTestId('options-menu'));
    _reactNative.fireEvent.press(getByText(/^pause$/i));
    expect(queryByText(/^paused$/i)).toBeTruthy();
    expect(spyOnLoggerPauseRequests).toHaveBeenCalledTimes(1);
    _reactNative.fireEvent.press(getByTestId('options-menu'));
    _reactNative.fireEvent.press(getByText(/^resume$/i));
    expect(queryByText(/^paused$/i)).toBeFalsy();
    spyOnLoggerPauseRequests.mockRestore();
    unmount();
  });
  it('should clear the logs on demand', async () => {
    const spyOnLoggerClearRequests = jest.spyOn(_loggerSingleton.default, 'clearRequests').mockImplementationOnce(() => null);
    const {
      getByText,
      queryByText,
      getByTestId,
      unmount
    } = (0, _reactNative.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(MyNetworkLogger, {}));
    expect(spyOnLoggerClearRequests).toHaveBeenCalledTimes(0);
    _reactNative.fireEvent.press(getByTestId('options-menu'));
    expect(queryByText(/^options$/i)).toBeDefined();
    _reactNative.fireEvent.press(getByText(/^clear/i));
    expect(spyOnLoggerClearRequests).toHaveBeenCalledTimes(1);
    spyOnLoggerClearRequests.mockRestore();
    unmount();
  });
});
describe('regular vs compact row', () => {
  it.each([true, false])('should render the row compact: %p', compact => {
    const requests = [];
    const spyOnLoggerSetCallback = jest.spyOn(_loggerSingleton.default, 'setCallback');
    const emitCallback = jest.fn();
    spyOnLoggerSetCallback.mockImplementation(callback => {
      return emitCallback.mockImplementation(id => {
        if (id !== 1) {
          const request = new _NetworkRequestInfo.default(`${id}`, 'XMLHttpRequest', 'GET', `http://example.com/${id}`);
          requests.unshift(request);
          return callback(requests);
        }
        const request = new _NetworkRequestInfo.default('1', 'XMLHttpRequest', 'POST', 'http://example.com/1');
        request.startTime = new Date('2000-01-01T12:34:00.000Z').getTime();
        request.endTime = new Date('2000-01-01T12:34:56.789Z').getTime();
        request.status = 200;
        requests.unshift(request);
        return callback(requests);
      });
    });
    const {
      getByText
    } = (0, _reactNative.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(MyNetworkLogger, {
      compact: compact
    }));
    (0, _reactNative.act)(() => {
      emitCallback(1);
    });
    const method = getByText(/^post$/i);
    expect(method).toBeTruthy();
    expect(!!(0, _reactNative.within)(method.parent.parent).queryByText(/^12:34:00$/i)).toBe(compact);
    const status = getByText(/^200$/i);
    expect(status).toBeTruthy();
    expect((0, _reactNative.within)(status.parent.parent).queryByText(/^56789ms$/i)).toBeTruthy();
    expect((0, _reactNative.within)(status.parent.parent).queryByText(/^12:34:00$/i)).not.toBe(compact);
    spyOnLoggerSetCallback.mockRestore();
  });
});
//# sourceMappingURL=NetworkLogger.spec.js.map