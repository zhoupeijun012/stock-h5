// 股票趋势
// HHJSJDA:=(3*CLOSE+OPEN+LOW+HIGH)/6;
// HHJSJDB:(20*HHJsjda+19*REF(HHJsjda,1)+18*REF(HHJsjda,2)+17*REF(HHJsjda,3)+16*REF(HHJsjda,4)+15*REF(HHJsjda,5)+14*REF(HHJsjda,6)
// +13*REF(HHJsjda,7)+12*REF(HHJsjda,8)+11*REF(HHJsjda,9)+10*REF(HHJsjda,10)+9*REF(HHJsjda,11)+8*REF(HHJsjda,12)
// +7*REF(HHJsjda,13)+6*REF(HHJsjda,14)+5*REF(HHJsjda,15)+4*REF(HHJsjda,16)+3*REF(HHJsjda,17)+2*REF(HHJsjda,18)+
// REF(HHJsjda,20))/210,coloryellow;
// HHJSJDC:MA(HHJSJDB,5),colorred;

import { TrendIndicators } from '@/utils/stock-tdx';
export default {
  name: "trend-line",
  shortName: "股价趋势",
  shouldOhlc: true,
  precision: 2,
  shouldCheckParamCount: false,
//   zLevel: 1000,
  series: 'price',
  figures: [
    {
      key: "HHJSJDB",
    //   title: 'HHJSJDB',
      type: "line",
      styles: ({ data, indicator, defaultStyles }) => {
        return { color: "#f00" };
      },
    }, // 默认黄色
    {
      key: "HHJSJDC",
      type: "line",
    //   title: 'HHJSJDC',
      styles: ({ data, indicator, defaultStyles }) => {
        return { color: "purple" };
      },
    }, // 默认黄色
  ],
  calc(dataList) {
    const controls = TrendIndicators.result(dataList);
    return controls;
  },
};
