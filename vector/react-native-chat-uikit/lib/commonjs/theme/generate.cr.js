"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCornerRadius = generateCornerRadius;
exports.generateExtraLargeCornerRadius = generateExtraLargeCornerRadius;
exports.generateExtraSmallCornerRadius = generateExtraSmallCornerRadius;
exports.generateLargeCornerRadius = generateLargeCornerRadius;
exports.generateMediumCornerRadius = generateMediumCornerRadius;
exports.generateSmallCornerRadius = generateSmallCornerRadius;
function generateCornerRadius(type, height) {
  let ret = 0;
  switch (type) {
    case 'extraSmall':
      ret = 4;
      break;
    case 'small':
      ret = 8;
      break;
    case 'medium':
      ret = 12;
      break;
    case 'large':
      ret = 16;
      break;
    case 'extraLarge':
      ret = height ? height / 2 : 16;
      break;
  }
  return ret;
}
function generateExtraSmallCornerRadius() {
  return generateCornerRadius('extraSmall');
}
function generateSmallCornerRadius() {
  return generateCornerRadius('small');
}
function generateMediumCornerRadius() {
  return generateCornerRadius('medium');
}
function generateLargeCornerRadius() {
  return generateCornerRadius('large');
}
function generateExtraLargeCornerRadius() {
  return generateCornerRadius('extraLarge');
}
//# sourceMappingURL=generate.cr.js.map