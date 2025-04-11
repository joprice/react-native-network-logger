"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../theme");
var _ResultItem = _interopRequireDefault(require("./ResultItem"));
var _SearchBar = _interopRequireDefault(require("./SearchBar"));
var _AppContext = require("./AppContext");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RequestList = ({
  requestsInfo,
  onPressItem,
  options,
  showDetails,
  compact,
  maxRows
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  const [searchValue, onChangeSearchText] = (0, _react.useState)('');
  const {
    search,
    filter
  } = (0, _AppContext.useAppContext)();
  const lcSearch = search.toLowerCase().trim();
  const filteredRequests = (0, _react.useMemo)(() => {
    return requestsInfo.filter(request => {
      const searchMatches = !lcSearch || request.url.toLowerCase().includes(lcSearch) || request.gqlOperation?.toLowerCase().includes(lcSearch);
      const filterMethodMatches = (filter.methods?.size ?? 0) === 0 || filter.methods?.has(request.method);
      const filterStatusMatches = filter.status ? request.status === filter.status : filter.statusErrors ? request.status >= 400 : true;
      const filterMatches = filterMethodMatches && filterStatusMatches;
      return searchMatches && filterMatches;
    }).slice(0, maxRows);
  }, [requestsInfo, lcSearch, filter, maxRows]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [!showDetails && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SearchBar.default, {
      value: searchValue,
      onChangeText: onChangeSearchText,
      options: options
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      keyExtractor: item => item.id,
      data: filteredRequests,
      renderItem: ({
        item
      }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ResultItem.default, {
        request: item,
        onPress: () => onPressItem(item.id),
        compact: compact,
        list: true
      })
    })]
  });
};
const themedStyles = theme => _reactNative.StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1
  }
});
var _default = exports.default = RequestList;
//# sourceMappingURL=RequestList.js.map