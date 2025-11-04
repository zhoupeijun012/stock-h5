import dayjs from 'dayjs';
const sha256 = require('sha256');
const getCount = (time) => {
  const sec = parseInt(time.slice(4, 6));
  const min = parseInt(time.slice(2, 4));
  const hour = parseInt(parseInt(time.slice(0, 2)));
  const count = sec + min * 60 + hour * 3600;
  return count;
};
const startVal = getCount('090000');
const fontEndVal = getCount('113000');
const endVal = getCount('153000');
const gapVal = getCount('013000');
const allVal = endVal - startVal - gapVal;

export const xPos = (time) => {
  // 在这里处理间隔
  let countVal = getCount(time);
  console.log(countVal, time, startVal);
  // 大于11:30:00 ，那么就需要减数据
  if (countVal > fontEndVal) {
    console.log('223');
    countVal -= gapVal;
  }
  // 再减去9:15:00
  countVal -= startVal;
  return parseInt((countVal / allVal) * 1000) / 1000;
};
window.xPos = xPos;

export const getFormatTime = (time, split = '-') => {
  const sec = time.slice(4, 6);
  const min = time.slice(2, 4);
  const hour = parseInt(time.slice(0, 2));
  return [hour, min].join(split);
};

export const jsonp = (req, error) => {
  var script = document.createElement('script');
  var url = req;
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
  script.onerror = error;
};

const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};
export const deepMerge = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
};

export const IS_OPEN_DAY = (date) => {
  const day = dayjs(date).day();
  return !window.chineseDays.isHoliday(date) && !(day == 0 || day == 6);
};

export const GET_LAST_DATE = (count) => {
  const arr = [];
  let i = 0;
  do {
    const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
    if (IS_OPEN_DAY(date)) {
      arr.push(date);
    }
    i++;
  } while (arr.length < count);
  return arr;
};

export const formatMoney = (value) => {
  if (isNaN(value) || value == '' || value == null) {
    return '-';
  }
  const wy = 1000000000000;
  if (value > wy || value < -wy) {
    return parseInt((value / wy) * 100) / 100 + '万亿';
  }

  const y = 100000000;
  if (value > y || value < -y) {
    return parseInt((value / y) * 100) / 100 + '亿';
  }

  const w = 10000;
  if (value > w || value < -w) {
    return parseInt((value / w) * 100) / 100 + '万';
  }

  return value;
};

export const valueStyle = (value) => {
  return {
    color: parseFloat(value) > 0 ? 'red' : parseFloat(value) == 0 ? 'gray' : 'green',
  };
};

export const formatPrec = (value, subFix = '', fixed = 2) => {
  return isNaN(value) || value === '' || value === null ? '-' : Number(parseInt(value) / 100).toFixed(fixed) + subFix;
};

export const IN_OPEN_TIME = () => {
  return (
    (dayjs().format('HHmmss') >= '092500' && dayjs().format('HHmmss') <= '113000') ||
    (dayjs().format('HHmmss') >= '130000' && dayjs().format('HHmmss') <= '150000')
  );
};

export const IN_OPEN_RANGE = () => {
  return dayjs().format('HHmmss') >= '092500';
};

export const stockKMap = (lines = []) => {
  const mapFunc = (item) => {
    const splitArr = item.split(',');
    //  时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率/流通股本
    return {
      timestamp: splitArr[0],
      open: parseFloat(splitArr[1]),
      close: parseFloat(splitArr[2]),
      high: parseFloat(splitArr[3]),
      low: parseFloat(splitArr[4]),
      // 成交量
      volume: parseFloat(splitArr[5]),
      // 成交额
      amount: parseFloat(splitArr[6]),
      turnover: formatMoney(parseFloat(splitArr[6])),
      // 涨跌额
      change: formatMoney(splitArr[8]),
      capital: parseFloat(splitArr[11]),
    };
  };
  let chartData = {};
  if (Array.isArray(lines)) {
    chartData = lines.map((item) => {
      return mapFunc(item);
    });
  } else {
    chartData = lines ? mapFunc(lines) : [];
  }
  return chartData;
};

export const stockKMapFromDetail = (detail) => {
  // 时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率
  const { f17, f2, f15, f16, f5, f6, f7, f3, f4, f8 } = detail;
  const arr = [GET_LAST_DATE(1)[0], f17 / 100, f2 / 100, f15 / 100, f16 / 100, f5, f6, f7 / 100, f3 / 100, f4 / 100, f8 / 100];
  return arr.join(',');
};

export const concatKFromDetail = (lines = '', detail) => {
  lines = JSON.parse(lines || '[]');
  let firstItem = lines[lines.length - 1];
  const lastDate = GET_LAST_DATE(1)[0];
  if (firstItem && dayjs(lastDate).isAfter(firstItem.split(',')[0]) && IN_OPEN_RANGE()) {
    lines.push(stockKMapFromDetail(detail));
  }
  return lines;
};

export const fundKMap = (lines) => {
  const mapFunc = (item) => {
    const arr = item.split(',');
    // 日期/主力净流入/小单净流入/中单净流入/大单净流入/超大单净流入/主力流入净占比/小单净占比/中单净占比/大单净占比/超大单净占比/收盘价/涨跌幅
    return {
      // 日期
      f124: arr[0],
      // 主力净流入
      f62: arr[1],
      // 小单净流入
      f84: arr[2],
      // 中单净流入
      f78: arr[3],
      // 大单净流入
      f72: arr[4],
      // 超大单净流入
      f66: arr[5],
      // 收盘价
      f2: arr[11],
      // 涨跌幅
      f3: arr[12],
    };
  };
  let chartData = {};
  if (Array.isArray(lines)) {
    chartData = lines.map((item) => {
      return mapFunc(item);
    });
  } else {
    chartData = lines ? mapFunc(lines) : [];
  }
  return chartData;
};

export const fundMapFromDetail = (detail) => {
  // 日期/主力净流入/小单净流入/中单净流入/大单净流入/超大单净流入/主力流入净占比/小单净占比/中单净占比/大单净占比/超大单净占比/收盘价/涨跌幅
  const { f62, f84, f78, f72, f66, f184, f87, f81, f75, f69, f2, f3 } = detail;

  const arr = [GET_LAST_DATE(1)[0], f62, f84, f78, f72, f66, f184, f87, f81, f75, f69, f2 / 100, f3 / 100];
  return arr.join(',');
};

export const concatFundFromDetail = (lines = '', detail) => {
  lines = JSON.parse(lines || '[]');
  let firstItem = lines[lines.length - 1];
  const lastDate = GET_LAST_DATE(1)[0];
  if (firstItem && dayjs(lastDate).isAfter(firstItem.split(',')[0]) && IN_OPEN_RANGE()) {
    lines.push(fundMapFromDetail(detail));
  }
  return lines;
};

export function detectPwaMode() {
  // 1. 标准 display-mode 检测
  const displayMode = window.matchMedia('(display-mode: standalone)').matches;

  // 2. iOS Safari 检测
  const iOS = /iphone|ipod|ipad/i.test(navigator.userAgent);
  const iOSStandalone = iOS && window.navigator.standalone === true;

  // 3. Chrome/Edge 安装检测
  const chromeInstalled = window.matchMedia('(display-mode: minimal-ui)').matches || window.matchMedia('(display-mode: fullscreen)').matches;

  // 4. 其他浏览器特征检测
  const hasLauncherIcon = window.matchMedia('(display-mode: standalone)').matches || document.referrer.includes('android-app://');

  return displayMode || iOSStandalone || chromeInstalled || hasLauncherIcon;
}

export function MD5(str) {
  return sha256(str);
}
export function formatDD(dataStr = '') {
  let fixedStr = dataStr.split('.')[0];
  return dayjs(fixedStr).format('YYYY-MM-DD HH:mm:ss');
}
