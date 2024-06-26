"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateBodyFont = generateBodyFont;
exports.generateHeadlineFont = generateHeadlineFont;
exports.generateLabelFont = generateLabelFont;
exports.generateTitleFont = generateTitleFont;
function generateFont(props) {
  const {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight
  } = props;
  return {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight
  };
}
function generateHeadlineFont() {
  return {
    large: generateFont({
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28
    }),
    medium: generateFont({
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24
    }),
    small: generateFont({
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22
    })
  };
}
function generateTitleFont() {
  return {
    large: generateFont({
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 24
    }),
    medium: generateFont({
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 22
    }),
    small: generateFont({
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20
    })
  };
}
function generateLabelFont() {
  return {
    large: generateFont({
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 22
    }),
    medium: generateFont({
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 18
    }),
    small: generateFont({
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16
    }),
    extraSmall: generateFont({
      fontSize: 11,
      fontWeight: '500',
      lineHeight: 14
    })
  };
}
function generateBodyFont() {
  return {
    large: generateFont({
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 22
    }),
    medium: generateFont({
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 18
    }),
    small: generateFont({
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16
    }),
    extraSmall: generateFont({
      fontSize: 11,
      fontWeight: '400',
      lineHeight: 14
    })
  };
}
//# sourceMappingURL=generate.font.js.map