export default {
  name: "distance",
  shortName: "",
  visible: true,
  shouldOhlc: false,
  isStack: false,
  zLevel: -1,
  calc: (kLineDataList) => {
    const lastVal = kLineDataList[kLineDataList.length - 1].close;
    const result = [];
    kLineDataList.forEach((item, index) => {
      const distance = Math.ceil((lastVal -item.close ) / item.close * 10000) / 100
      item["distance"] = distance;
      result.push({
        distance,
      });
    });
    return result;
  },
  createTooltipDataSource: ({ crosshair: { kLineData } }) => {
    return {
      legends: [
        {
          title: "距今涨幅: ",
          name:'distance',
          calcParamsText: "距今涨幅: ",
          value: {
            text: kLineData.distance + "%",
            color:
              kLineData.distance > 0
                ? "#f00"
                : kLineData.distance == 0
                ? "#888888"
                : "#2DC08E",
          },
        },
      ],
    };
  },
};
