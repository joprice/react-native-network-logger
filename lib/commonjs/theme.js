"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useThemedStyles = exports.useTheme = exports.ThemeContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ThemeContext = exports.ThemeContext = /*#__PURE__*/_react.default.createContext('light');
const darkTheme = {
  colors: {
    background: '#2d2a28',
    link: '#0077ff',
    card: '#3a3a3c',
    text: '#ffffff',
    statusGood: '#28a844',
    statusWarning: '#ffc007',
    statusBad: '#dd3444',
    secondary: '#2c7489',
    onSecondary: '#ffffff',
    muted: '#cccccc'
  }
};
const lightTheme = {
  colors: {
    background: '#ededed',
    link: '#0077ff',
    card: '#ffffff',
    text: '#000000',
    statusGood: '#28a844',
    statusWarning: '#ffc007',
    statusBad: '#dd3444',
    secondary: '#2c7489',
    onSecondary: '#ffffff',
    muted: '#757575'
  }
};
const themes = {
  dark: darkTheme,
  light: lightTheme
};
const useTheme = () => {
  const themeValue = (0, _react.useContext)(ThemeContext);
  return typeof themeValue === 'string' ? themes[themeValue] : {
    colors: {
      ...lightTheme.colors,
      ...themeValue.colors
    }
  };
};
exports.useTheme = useTheme;
const useThemedStyles = styles => {
  const theme = useTheme();
  return styles(theme);
};
exports.useThemedStyles = useThemedStyles;
//# sourceMappingURL=theme.js.map