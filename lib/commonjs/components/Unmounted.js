"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _theme = require("../theme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Unmounted = () => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.heading,
      children: "Unmounted Error"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.body,
      children: "It looks like the network logger hasn\u2019t been enabled yet."
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
      style: styles.body,
      children: ["This is likely due to you running another debugging tool that is also intercepting network requests. Either disable that or start the network logger with the option:", ' ', /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.code,
        children: "\"forceEnable: true\""
      }), "."]
    })]
  });
};
const themedStyles = theme => _reactNative.StyleSheet.create({
  container: {
    padding: 15
  },
  heading: {
    color: theme.colors.text,
    fontWeight: '600',
    fontSize: 25,
    marginBottom: 10
  },
  body: {
    color: theme.colors.text,
    marginTop: 5
  },
  code: {
    color: theme.colors.muted
  }
});
var _default = exports.default = Unmounted;
//# sourceMappingURL=Unmounted.js.map