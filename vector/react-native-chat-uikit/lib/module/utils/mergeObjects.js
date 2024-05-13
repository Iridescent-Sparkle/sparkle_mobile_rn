export function mergeObjects(part, full) {
  const mergedObj = {
    ...full
  };
  for (const key in part) {
    var _part$hasOwnProperty;
    if (part !== null && part !== void 0 && (_part$hasOwnProperty = part.hasOwnProperty) !== null && _part$hasOwnProperty !== void 0 && _part$hasOwnProperty.call(part, key)) {
      const k = key;
      if (typeof part[key] === 'object' && full.hasOwnProperty(key) && typeof full[k] === 'object') {
        // If the property value is an object, merge recursively
        mergedObj[k] = mergeObjects(part[key], full[k]);
      } else {
        // Otherwise, use the attributes in part directly.
        mergedObj[k] = part[key];
      }
    }
  }
  return mergedObj;
}
//# sourceMappingURL=mergeObjects.js.map