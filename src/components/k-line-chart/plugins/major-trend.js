// 海洋捕捞
// WY1002:=EMA(WY1001,4);
// WY1003:=EMA(WY1002,4);
// WY1004:=EMA(WY1003,4);
// XYS0:(WY1004-REF(WY1004,1))/REF(WY1004,1)*100;
// PJGJ:=AMOUNT/VOL/100;
// SSRYDJX:=MA(PJGJ,13);
// SSRCJL:=EMA(VOL,13);
// SSRCJE:=EMA(AMOUNT,13);
// SSRCBJX:=SSRCJE/SSRCJL/100;
// CYS13:=(CLOSE-SSRCBJX)/SSRCBJX*100;
// XYSHSL:=EMA(VOL/CAPITAL*100,13);
// XYS1:MA(XYS0,2);
// XYS2:MA(XYS0,1);

// STICKLINE(XYS0>=0,XYS0,0,3,0),COLORRED;
// STICKLINE(XYS0<0,XYS0,0,3,0),COLORGREEN;
// STICKLINE(XYSHSL>6.1 AND CYS13>5 ,2 ,0 ,3 ,0 ),COLORGREEN;
// STICKLINE(XYSHSL>3.8 AND CYS13>5 ,1.5 ,0 ,3 ,0 ),COLORYELLOW;
// STICKLINE(XYSHSL>2.1 AND CYS13>5 ,1 ,0 ,3 ,0 ),COLORCYAN;
// STICKLINE(XYSHSL>1.8 AND CYS13>5 ,0.5 ,0 ,3,0 ),COLORBLUE;

import { MajorIndicator } from '@/utils/stock-tdx.js';

export default {
  name: 'major-trend',
  shortName: '主力趋势',
  visible: true,
  shouldOhlc: false,
  isStack: false,
  precision: 3,
  figures: [
    {
      key: 'XYS0',
      type: 'bar',
      title: 'XYS0：',
      baseValue: 0,
      styles: ({ data, indicator, defaultStyles }) => {
        const { prev, current } = data;
        if (current) {
          if (current.XYS0 >= 0) {
            return { color: defaultStyles.bars[0].upColor };
          } else {
            return { color: defaultStyles.bars[0].downColor };
          }
        }
        return false;
      },
    }, // 默认黄色
    {
      key: 'XYS1',
      type: 'line',
      title: 'XYS1：',
      styles: ({ data, indicator, defaultStyles }) => {
        return { color: '#1677ff' };
      },
    }, // 默认黄色
    {
      key: 'XYS2',
      type: 'line',
      title: 'XYS2：',
      styles: ({ data, indicator, defaultStyles }) => {
        return { color: '#800080' };
      },
    }, // 默认黄色
    {
      key: 'XYS3',
      type: 'circle',
      baseValue: 0,
      styles: ({ data, indicator, defaultStyles }) => {
        const { prev, current } = data;
        if (current) {
          if (current.XYS0 > current.XYS1) {
            return { color: 'gold' };
          } else {
            return { color: 'blue' };
          }
        }
        return false;
      },
    }, // 默认黄色
  ],
  calc(dataList) {
    const controls = MajorIndicator.result(dataList);
    let minVal = Infinity;
    controls.forEach((item) => {
      minVal = Math.min(minVal, item.XYS0, item.XYS1);
    });
    controls.forEach((item) => {
      item['XYS3'] = minVal - 0.3;
    });
    return controls;
  },
};
