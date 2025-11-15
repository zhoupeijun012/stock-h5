const movingAverage = {
  name: "move-average",
  shortName: "",
  calcParams: [5, 10, 30, 60, 120],
  precision: 2,
  shouldOhlc: false,
  figures: [
    { key: "ma1", title: "MA5: ", type: "line" },
    { key: "ma2", title: "MA10: ", type: "line" },
    { key: "ma3", title: "MA30: ", type: "line" },
    { key: "ma4", title: "MA60: ", type: "line" },
    { key: "ma5", title: "MA120: ", type: "line" },
  ],
  regenerateFigures: (params) =>
    params.map((p, i) => ({
      key: `ma${i + 1}`,
      title: `MA${p}: `,
      type: "line",
    })),
  calc: (dataList, indicator) => {
    const { calcParams, figures } = indicator;
    const closeSums = [];
    return dataList.map((kLineData, i) => {
      const ma = {};
      const close = kLineData.close;
      calcParams.forEach((p, index) => {
        closeSums[index] = (closeSums[index] || 0) + close;
        if (i >= p - 1) {
          ma[figures[index].key] = closeSums[index] / p;
          closeSums[index] -= dataList[i - (p - 1)].close;
        }
      });
      return ma;
    });
  },
};

export default movingAverage;
