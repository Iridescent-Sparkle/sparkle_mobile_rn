import * as React from 'react';
export function useGetItems(initItems) {
  const [_items, setItems] = React.useState(initItems ?? []);
  const _updateItems = items => {
    setItems([...items]);
  };
  return {
    items: _items,
    updateItems: _updateItems
  };
}
//# sourceMappingURL=BottomSheetMenu.hooks.js.map