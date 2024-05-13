export function generateCornerRadius(type, height) {
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
export function generateExtraSmallCornerRadius() {
  return generateCornerRadius('extraSmall');
}
export function generateSmallCornerRadius() {
  return generateCornerRadius('small');
}
export function generateMediumCornerRadius() {
  return generateCornerRadius('medium');
}
export function generateLargeCornerRadius() {
  return generateCornerRadius('large');
}
export function generateExtraLargeCornerRadius() {
  return generateCornerRadius('extraLarge');
}
//# sourceMappingURL=generate.cr.js.map