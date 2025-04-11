"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../theme");
var _Options = _interopRequireDefault(require("./Options"));
var _Filters = _interopRequireDefault(require("./Filters"));
var _AppContext = require("./AppContext");
var _Icon = _interopRequireDefault(require("./Icon"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SearchBar = ({
  options
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  const theme = (0, _theme.useTheme)();
  const {
    search,
    filterActive,
    dispatch
  } = (0, _AppContext.useAppContext)();
  const [showFilters, setShowFilters] = (0, _react.useState)(false);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.searchContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.searchBar,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
          name: "search"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
          onChangeText: text => dispatch({
            type: 'SET_SEARCH',
            payload: text
          }),
          value: search,
          placeholder: "Filter URLs",
          underlineColorAndroid: "transparent",
          style: styles.textInputSearch,
          placeholderTextColor: theme.colors.muted
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
          name: "filter",
          onPress: () => setShowFilters(!showFilters),
          accessibilityLabel: "Filter",
          iconStyle: [styles.filterIcon, filterActive && styles.filterActive]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Options.default, {
        options: options
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Filters.default, {
      open: showFilters,
      onClose: () => setShowFilters(false)
    })]
  });
};
const themedStyles = theme => _reactNative.StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: theme.colors.muted,
    borderRadius: 10,
    flex: 1,
    paddingVertical: 5
  },
  backdrop: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  filterIcon: {
    marginRight: 0
  },
  filterActive: {
    tintColor: theme.colors.link
  },
  textInputSearch: {
    height: 30,
    padding: 0,
    flexGrow: 1,
    color: theme.colors.text
  },
  searchContainer: {
    flexDirection: 'row'
  },
  menu: {
    alignSelf: 'center'
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
var _default = exports.default = SearchBar;
//# sourceMappingURL=SearchBar.js.map