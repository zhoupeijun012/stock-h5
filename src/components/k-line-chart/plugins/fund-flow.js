// 资金流向
// VAR1:=SMA(AMOUNT,10,1)/10000;
// VAR2:=REF(VAR1,1);
// VAR3:=SMA(AMOUNT,10,1)/10000;
// 资金运转: STICKLINE(VAR1>VAR2,VAR1,VAR2,3,0),COLORRED;
// 资金流失: STICKLINE(VAR1< VAR2,VAR1,VAR2,3,0),COLORGREEN;

import { FlowIndicator } from '@/utils/stock-tdx.js';

export default {
  name: 'fund-flow',
  shortName: '资金流向',
  visible: true,
  shouldOhlc: false,
  isStack: false,
  precision: 1,
  figures: [
    {
      key: 'MAX',
      type: 'bar',
      styles: ({ data, indicator, defaultStyles }) => {
        const { prev, current } = data;
        if (current) {
          return { color: current.color };
        }
        return false;
      },
    }, // 默认黄色
    {
      key: 'MIN',
      type: 'bar',
      styles: ({ data, indicator, defaultStyles }) => {
        return { color: '#fff' };
      },
    }, // 默认黄色
  ],
  calc(dataList) {
    const controls = FlowIndicator.result(dataList);
    return controls;
  },
};
