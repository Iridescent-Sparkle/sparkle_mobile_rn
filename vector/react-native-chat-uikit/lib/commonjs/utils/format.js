"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTs = formatTs;
exports.formatTs2 = formatTs2;
exports.formatTsForConvDetail = formatTsForConvDetail;
exports.formatTsForConvList = formatTsForConvList;
exports.getDateMeta = getDateMeta;
var _format = _interopRequireDefault(require("date-fns/format"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getDateMeta() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const yesterdayEnd = new Date(year, month, day, 0);
  const yesterMonthEnd = new Date(year, month, 1);
  const yesterYearEnd = new Date(year, 0);
  return {
    now: now,
    yesterday: yesterdayEnd,
    yesterMonth: yesterMonthEnd,
    yesterYear: yesterYearEnd
  };
}
function formatTs(date) {
  const align = c => {
    if (c < 10) {
      return `0${c}`;
    }
    return c.toString();
  };
  let _date;
  if (typeof date === 'number') {
    _date = new Date(date);
  } else {
    _date = date;
  }
  return `${align(_date.getHours())}:${align(_date.getMinutes())}`;
}
function formatTs2(date, anchor, locale) {
  let d = typeof date === 'number' ? date : date.getTime();
  const n = anchor === undefined ? new Date().getTime() : typeof anchor === 'number' ? anchor : anchor.getTime();
  const oneDayBefore = n - 24 * 60 * 60 * 1000;
  const todayYear = new Date(n).getFullYear();
  const oneYearBefore = new Date(todayYear, 0).getTime();
  if (d < oneYearBefore) {
    return (0, _format.default)(date, 'yyyy/MM/dd', {
      locale
    });
  } else if (oneYearBefore <= d && d < oneDayBefore) {
    return (0, _format.default)(date, 'MM/dd', {
      locale
    });
  } else {
    return (0, _format.default)(date, 'HH:mm', {
      locale
    });
  }
}
function formatTsForConvList(date, anchor, locale) {
  let d = typeof date === 'number' ? date : date.getTime();
  const n = anchor === undefined ? new Date().getTime() : typeof anchor === 'number' ? anchor : anchor.getTime();
  const oneDayBefore = n - 24 * 60 * 60 * 1000;
  if (d < oneDayBefore) {
    return (0, _format.default)(date, 'MMM dd', {
      locale
    });
  } else {
    return (0, _format.default)(date, 'HH:mm', {
      locale
    });
  }
}
function formatTsForConvDetail(date, anchor, locale) {
  let d = typeof date === 'number' ? date : date.getTime();
  const n = anchor === undefined ? new Date().getTime() : typeof anchor === 'number' ? anchor : anchor.getTime();
  const oneDayBefore = n - 24 * 60 * 60 * 1000;
  if (d < oneDayBefore) {
    return (0, _format.default)(date, 'MMM dd HH:mm', {
      locale
    });
  } else {
    return (0, _format.default)(date, 'HH:mm', {
      locale
    });
  }
}
//# sourceMappingURL=format.js.map