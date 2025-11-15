// 主力控盘
// N:=35;M:=35;N1:=3;
// B1:=(HHV(H,N)-C)/(HHV(H,N)-LLV(LOW,N))*100- M;
// B2:=SMA(B1,N,1)+100;
// B3:=(C-LLV(L,N))/(HHV(H,N)- LLV(L,N))*100;
// B4:=SMA(B3,3,1);
// B5:=SMA(B4,3,1)+100;
// B6:=B5-B2;
// 控盘程度:(IF(B6>N1,B6-N1,0))*2.5,COLORYELLOW;
// 控盘度:100,COLORRED;
// STICKLINE( 控盘程度,0,控盘程度 ,7,0 ),COLOR00FFFF;
// STICKLINE( 控盘程度 AND 控盘程度>100,100,控盘程度 ,7,0 ),COLORRED;

import { DegreeIndicators } from '@/utils/stock-tdx.js';

export default {
  name: "control-degree",
  shortName: "主力控盘",
  visible: true,
  shouldOhlc: false,
  isStack: false,
  precision: 1,
  figures: [
    {
      key: "mid",
      type: "line",
      styles: ({ data, indicator, defaultStyles }) => {
        return { color: defaultStyles.bars[0].upColor };
      },
    }, // 默认黄色
    {
      key: "degreeB",
      type: "line",
      styles: ({ data, indicator, defaultStyles }) => {
        return { color: defaultStyles.bars[0].upColor};
      },
    }, // 默认黄色
    {
      key: "degreeB",
      type: "bar",
      title: '控盘程度',
      styles: ({ data, indicator, defaultStyles }) => {
        return {
          color: defaultStyles.bars[0].upColor ,
          fill: "tozeroy", // 填充到y=0轴
          fillcolor: "#f00",
        };
      },
    },
    {
      key: "degree",
      type: "bar",
      styles: ({ data, indicator, defaultStyles }) => {
        return { color: "gold" };
      },
    },
  ],
  calc(dataList) {
    const controls = DegreeIndicators.result(dataList);
    return controls;
  },
};
