"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDispatch = exports.useAppContext = exports.default = exports.AppContextProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const initialFilter = {
  methods: new Set()
};
const initialState = {
  search: '',
  filter: initialFilter,
  filterActive: false
};
const AppContext = /*#__PURE__*/_react.default.createContext({
  ...initialState,
  // @ts-ignore
  dispatch: {}
});
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
        filterActive: !!action.payload.methods?.size || !!action.payload.status || !!action.payload.statusErrors
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filter: initialFilter,
        filterActive: false
      };
    default:
      return state;
  }
};
const useAppContext = () => (0, _react.useContext)(AppContext);
exports.useAppContext = useAppContext;
const useDispatch = () => useAppContext().dispatch;
exports.useDispatch = useDispatch;
const AppContextProvider = ({
  children
}) => {
  const [state, dispatch] = (0, _react.useReducer)(reducer, initialState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(AppContext.Provider, {
    value: {
      ...state,
      dispatch
    },
    children: children
  });
};
exports.AppContextProvider = AppContextProvider;
var _default = exports.default = AppContext;
//# sourceMappingURL=AppContext.js.map