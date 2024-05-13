import * as React from 'react';
import { createDefaultStringSet } from './StringSet';
import { TranslateImpl } from './Translate';
/**
 * Context of the I18n.
 */
export const I18nContext = /*#__PURE__*/React.createContext(undefined);
I18nContext.displayName = 'UIKitI18nContext';

/**
 * Properties of the I18n context.
 */

/**
 * The I18n context's provider.
 */
export function I18nContextProvider(_ref) {
  let {
    value,
    children
  } = _ref;
  const {
    assets,
    languageCode
  } = value;
  const t = new TranslateImpl({
    assets: assets ?? createDefaultStringSet,
    type: languageCode
  });
  return /*#__PURE__*/React.createElement(I18nContext.Provider, {
    value: {
      tr: t.tr.bind(t),
      currentLanguage: t.currentLanguage.bind(t)
    }
  }, children);
}

/**
 * Get the I18n context's value.
 * @returns The I18n context's value.
 */
export function useI18nContext() {
  const i18n = React.useContext(I18nContext);
  if (!i18n) throw Error(`${I18nContext.displayName} is not provided`);
  return i18n;
}
//# sourceMappingURL=i18n.js.map