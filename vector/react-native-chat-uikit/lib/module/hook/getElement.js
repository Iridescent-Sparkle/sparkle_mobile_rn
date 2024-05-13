import * as React from 'react';

/**
 * Get the component.
 */
export function getElement(Component, ComponentProps) {
  if (Component === undefined || Component === null) {
    return null;
  }
  const isValid = /*#__PURE__*/React.isValidElement(Component);
  if (isValid) {
    return Component;
  } else if (typeof Component === 'function' || typeof Component === 'object') {
    const C = Component;
    if (ComponentProps === undefined || ComponentProps === null) {
      return /*#__PURE__*/React.createElement(C, null);
    }
    return /*#__PURE__*/React.createElement(C, ComponentProps);
  }
  return null;
}
//# sourceMappingURL=getElement.js.map