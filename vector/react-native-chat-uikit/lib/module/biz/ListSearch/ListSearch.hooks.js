import * as React from 'react';
import { useLifecycle } from '../../hook';
import { useFlatList } from '../List/List.hooks';
export function useListSearch(props) {
  const {
    onClicked,
    testMode,
    initData,
    onSearch: propsOnSearch
  } = props;
  const flatListProps = useFlatList({
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
  useLifecycle(React.useCallback(async state => {
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