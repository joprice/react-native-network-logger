"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactNative = require("@testing-library/react-native");
var _Header = _interopRequireDefault(require("./Header"));
var _reactNative2 = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
jest.mock('react-native/Libraries/Share/Share', () => ({
  share: jest.fn()
}));
jest.mock('./images/share.png', () => ({
  uri: ''
}));
test('it renders header correctly', () => {
  const {
    getByTestId,
    queryByTestId
  } = (0, _reactNative.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
    children: "My Title"
  }));
  expect(getByTestId('header-text').props.children).toEqual('My Title');
  expect(queryByTestId('header-share')).toBeNull();
});
test('share button renders when provided with value', async () => {
  const {
    getByTestId
  } = (0, _reactNative.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
    shareContent: "share me",
    children: "My Title"
  }));
  expect(getByTestId('header-text').props.children).toEqual('My Title');
  expect(getByTestId('header-share')).toBeDefined();
  (0, _reactNative.act)(() => {
    _reactNative.fireEvent.press(getByTestId('header-share'));
  });
  expect(_reactNative2.Share.share).toHaveBeenCalledWith({
    message: 'share me'
  });
});
test("share button doesn't render if content is empty string", async () => {
  const {
    getByTestId,
    queryByTestId
  } = (0, _reactNative.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
    shareContent: "",
    children: "My Title"
  }));
  expect(getByTestId('header-text').props.children).toEqual('My Title');
  expect(queryByTestId('header-share')).toBeNull();
});
//# sourceMappingURL=Header.spec.js.map