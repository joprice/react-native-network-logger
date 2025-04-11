"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Button = _interopRequireDefault(require("./Button"));
var _theme = require("../theme");
var _Modal = _interopRequireDefault(require("./Modal"));
var _Icon = _interopRequireDefault(require("./Icon"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Options = ({
  options
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  const [openOptions, setOpenOptions] = (0, _react.useState)(false);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      name: "more",
      onPress: () => setOpenOptions(true),
      testID: "options-menu",
      accessibilityLabel: "More",
      iconStyle: styles.iconButton
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Modal.default, {
      visible: openOptions,
      onClose: () => setOpenOptions(false),
      title: "Options",
      children: options.map(({
        text,
        onPress
      }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
        onPress: async () => {
          // Need to await in order for the getHar option to work
          await onPress();
          setOpenOptions(false);
        },
        children: text
      }, text))
    })]
  });
};
const themedStyles = () => _reactNative.StyleSheet.create({
  iconButton: {
    width: 30
  }
});
var _default = exports.default = Options;
//# sourceMappingURL=Options.js.map