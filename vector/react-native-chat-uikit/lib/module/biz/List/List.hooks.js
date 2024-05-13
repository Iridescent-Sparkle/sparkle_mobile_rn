import * as React from 'react';
import { useDelayExecTask, useLifecycle } from '../../hook';
import { ListIndex } from '../ListIndex';
export function useListBasic(props) {
  const {
    onVisibleItems,
    onRefresh: propsOnRefresh,
    // onSearch: propsOnSearch,
    onLoadMore: propsOnLoadMore,
    onInit,
    onUnInit
  } = props;
  const listType = React.useRef('FlatList').current;
  const loadType = React.useRef(props.loadType ?? 'once').current;
  const [listState, setListState] = React.useState(props.listState ?? 'normal');
  const isAutoLoad = React.useRef(props.isAutoLoad ?? true).current;
  const isSort = React.useRef(props.isSort ?? true).current;
  const isLoadAll = React.useRef(props.isLoadAll ?? true).current;
  const isShowAfterLoaded = React.useRef(props.isShowAfterLoaded ?? true).current;
  const isVisibleUpdate = React.useRef(props.isVisibleUpdate ?? false).current;
  const isAutoUpdate = React.useRef(props.isAutoUpdate ?? false).current;
  const isEventUpdate = React.useRef(props.isEventUpdate ?? true).current;
  const enableRefresh = React.useRef(props.onRefresh ? true : false).current;
  const enableMore = React.useRef(props.onLoadMore ? true : false).current;
  const [refreshing, setRefreshing] = React.useState(props.refreshing ?? false);
  const onSearchRef = React.useRef({});
  const viewabilityConfigRef = React.useRef({
    // minimumViewTime: 1000,
    viewAreaCoveragePercentThreshold: 50,
    itemVisiblePercentThreshold: 50,
    waitForInteraction: false
  });
  const {
    delayExecTask: onViewableItemsChanged
  } = useDelayExecTask(500, React.useCallback(info => {
    const list = info.viewableItems.map(v => {
      return v.item;
    });
    onVisibleItems === null || onVisibleItems === void 0 ? void 0 : onVisibleItems(list);
  }, [onVisibleItems]));
  const setOnSearch = React.useCallback(onSearch => {
    onSearchRef.current = onSearch;
  }, []);
  const {
    delayExecTask: deferSearch
  } = useDelayExecTask(500, React.useCallback(keyword => {
    var _onSearchRef$current;
    (_onSearchRef$current = onSearchRef.current) === null || _onSearchRef$current === void 0 ? void 0 : _onSearchRef$current.call(onSearchRef, keyword);
  }, []));
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      propsOnRefresh === null || propsOnRefresh === void 0 ? void 0 : propsOnRefresh();
      setRefreshing(false);
    }, 1000);
  }, [propsOnRefresh]);
  const onMore = React.useCallback(() => {
    propsOnLoadMore === null || propsOnLoadMore === void 0 ? void 0 : propsOnLoadMore();
  }, [propsOnLoadMore]);
  useLifecycle(React.useCallback(async state => {
    if (state === 'load') {
      onInit === null || onInit === void 0 ? void 0 : onInit();
    } else if (state === 'unload') {
      onUnInit === null || onUnInit === void 0 ? void 0 : onUnInit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));
  return {
    listState,
    setListState,
    listType,
    onRefresh: enableRefresh === true ? onRefresh : undefined,
    onMore: enableMore === true ? onMore : undefined,
    isAutoLoad,
    isSort,
    isLoadAll,
    isShowAfterLoaded,
    loadType,
    isVisibleUpdate,
    isAutoUpdate,
    isEventUpdate,
    refreshing: enableRefresh === true ? refreshing : undefined,
    viewabilityConfig: isVisibleUpdate === true ? viewabilityConfigRef.current : undefined,
    onViewableItemsChanged: isVisibleUpdate === true ? onViewableItemsChanged : undefined,
    deferSearch,
    setOnSearch
  };
}
export function useFlatList(props) {
  const basics = useListBasic({
    ...props,
    listType: 'FlatList'
  });
  const dataRef = React.useRef([]);
  const [data, setData] = React.useState(dataRef.current);
  const ListItem = () => null;
  const ref = React.useRef({});
  return {
    ...basics,
    dataRef,
    data,
    setData,
    ListItem,
    ref
  };
}
export function useSectionList(props) {
  const basics = useListBasic({
    ...props,
    listType: 'FlatList'
  });
  const sectionsRef = React.useRef([]);
  const [sections, setSection] = React.useState([]);
  const [indexTitles, setIndexTitles] = React.useState([]);
  const ref = React.useRef({});
  const AlphabeticIndex = ListIndex;
  return {
    ...basics,
    sectionsRef,
    sections,
    setSection,
    indexTitles,
    setIndexTitles,
    AlphabeticIndex,
    ref
  };
}
//# sourceMappingURL=List.hooks.js.map