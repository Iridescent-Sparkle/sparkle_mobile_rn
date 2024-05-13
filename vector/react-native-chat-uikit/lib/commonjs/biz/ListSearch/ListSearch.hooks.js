"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useListSearch = useListSearch;
var React = _interopRequireWildcard(require("react"));
var _hook = require("../../hook");
var _List = require("../List/List.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useListSearch(props) {
  const {
    onClicked,
    testMode,
    initData,
    onSearch: propsOnSearch
  } = props;
  const flatListProps = (0, _List.useFlatList)({
    isShowAfterLoaded: false
    // onSearch: (keyword: string) => onSearch(keyword),
  });

  const {
    setData,
    dataRef,
    isAutoLoad,
    isShowAfterLoaded,
    setOnSearch
  } = flatListProps;
  const isLocalSearch = React.useRef(props.onSearch ?? true).current;
  const keywordRef = React.useRef('');
  const onSearch = React.useCallback(async keyword => {
    keywordRef.current = keyword;
    if (keyword === '') {
      setData([]);
    } else {
      if (propsOnSearch) {
        const data = await propsOnSearch(keyword);
        setData(data.map(item => {
          return {
            id: item.id,
            data: item,
            keyword: keyword
          };
        }));
      } else {
        setData([...dataRef.current.filter(item => {
          var _item$data$name;
          return (_item$data$name = item.data.name) === null || _item$data$name === void 0 ? void 0 : _item$data$name.includes(keyword);
        }).map(item => {
          return {
            ...item,
            keyword: keyword
          };
        })]);
      }
    }
  }, [dataRef, propsOnSearch, setData]);
  const onClickedCallback = React.useCallback(data => {
    if (onClicked) {
      onClicked(data);
    }
  }, [onClicked]);
  const init = React.useCallback(async () => {
    if (isLocalSearch === false) {
      return;
    }
    if (testMode === 'only-ui') {
      return;
    }
    if (isAutoLoad === true) {
      if (typeof initData === 'function') {
        const data = await initData();
        dataRef.current = data.map(item => {
          return {
            id: item.id,
            data: item,
            keyword: keywordRef.current
          };
        });
        if (isShowAfterLoaded === true || keywordRef.current.length > 0) {
          onSearch(keywordRef.current);
        }
      } else {
        const data = initData;
        dataRef.current = data.map(item => {
          return {
            id: item.id,
            data: item,
            keyword: keywordRef.current
          };
        });
        if (isShowAfterLoaded === true || keywordRef.current.length > 0) {
          onSearch(keywordRef.current);
        }
      }
    }
  }, [dataRef, initData, isAutoLoad, isLocalSearch, isShowAfterLoaded, onSearch, testMode]);
  const unInit = () => {};
  (0, _hook.useLifecycle)(React.useCallback(async state => {
    if (state === 'load') {
      setOnSearch(onSearch);
      init();
    } else if (state === 'unload') {
      unInit();
    }
  }, [init, onSearch, setOnSearch]));
  return {
    ...flatListProps,
    onClicked: onClickedCallback
  };
}
//# sourceMappingURL=ListSearch.hooks.js.map