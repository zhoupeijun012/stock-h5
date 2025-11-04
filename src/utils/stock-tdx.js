/**
 * 股票技术指标计算工具（静态方法版）
 */
export class DegreeIndicators {
  /**
   * 计算指定周期内的最高价
   * @param {Array} data - 数据数组
   * @param {number} currentIndex - 当前索引
   * @param {number} period - 周期
   * @param {string} field - 字段名，如 'high' 表示最高价
   * @returns {number} - 最高价
   */
  static calculateHHV(data, currentIndex, period, field) {
    let max = -Infinity;
    const startIndex = Math.max(0, currentIndex - period + 1);

    for (let i = startIndex; i <= currentIndex; i++) {
      max = Math.max(max, data[i][field]);
    }

    return max;
  }

  /**
   * 计算指定周期内的最低价
   * @param {Array} data - 数据数组
   * @param {number} currentIndex - 当前索引
   * @param {number} period - 周期
   * @param {string} field - 字段名，如 'low' 表示最低价
   * @returns {number} - 最低价
   */
  static calculateLLV(data, currentIndex, period, field) {
    let min = Infinity;
    const startIndex = Math.max(0, currentIndex - period + 1);

    for (let i = startIndex; i <= currentIndex; i++) {
      min = Math.min(min, data[i][field]);
    }

    return min;
  }

  /**
   * 计算SMA（简单移动平均）
   * @param {Array} data - 数据数组
   * @param {number} currentIndex - 当前索引
   * @param {number} period - 周期
   * @param {number} weight - 权重
   * @param {string} field - 字段名，如 'b1'
   * @param {number} currentValue - 当前值
   * @returns {number} - SMA值
   */
  static calculateSMA(data, currentIndex, period, weight, field, currentValue) {
    const smaField = `sma_${field}`;

    // 初始化SMA数组
    if (!data[0].hasOwnProperty(smaField)) {
      data.forEach((item) => {
        item[smaField] = 0;
      });
    }

    // 如果是第一个周期，直接返回当前值
    if (currentIndex === 0) {
      data[0][smaField] = currentValue;
      return currentValue;
    }

    // 计算SMA
    const prevSMA = data[currentIndex - 1][smaField];
    const sma = (weight * currentValue + (period - weight) * prevSMA) / period;

    // 保存SMA结果
    data[currentIndex][smaField] = sma;

    return sma;
  }

  /**
   * 计算股票控盘程度指标（带日期输出）
   * @param {Array} data - 包含股票数据的数组，每个元素需包含 timestamp（日期戳）及 {high, low, close}
   * @param {Object} [options] - 可选参数
   * @param {number} [options.N=35] - 计算HHV和LLV的周期
   * @param {number} [options.M=35] - B1公式中的偏移量
   * @param {number} [options.N1=3] - 判断控盘的阈值
   * @returns {Array} - 包含控盘程度和日期的数组
   */
  static result(data, options = {}) {
    // 参数默认值
    const N = options.N || 35;
    const M = options.M || 35;
    const N1 = options.N1 || 1;

    // 确保数据长度足够
    if (data.length < N) {
      return Array(data.length).fill({ timestamp: 0, degreeB: 0, degree: 0, mid: 0 });
    }

    // 初始化结果数组
    const result = [];

    // 计算各中间变量
    for (let i = 0; i < data.length; i++) {
      // 提取当前日期（确保数据包含timestamp字段）
      const timestamp = data[i].timestamp || 0;

      // 计算HHV(H,N) - 当前位置及前N-1个位置的最高价
      const hhv = this.calculateHHV(data, i, N, 'high');

      // 计算LLV(L,N) - 当前位置及前N-1个位置的最低价
      const llv = this.calculateLLV(data, i, N, 'low');

      // 计算B1
      const B1 = ((hhv - data[i].close) / (hhv - llv)) * 100 - M;

      // 计算B2: SMA(B1,N,1)+100
      const B2 = this.calculateSMA(data, i, N, 1, 'b1', B1) + 100;

      // 计算B3
      const B3 = ((data[i].close - llv) / (hhv - llv)) * 100;

      // 计算B4: SMA(B3,3,1)
      const B4 = this.calculateSMA(data, i, 3, 1, 'b3', B3);

      // 计算B5: SMA(B4,3,1)+100
      const B5 = this.calculateSMA(data, i, 3, 1, 'b4', B4) + 100;

      // 计算B6
      const B6 = B5 - B2;

      // 计算控盘程度
      const controlDegree = B6 > N1 ? (B6 - N1) * 2.5 : 0;

      // 保存中间结果（可选，用于调试）
      data[i].b1 = B1;
      data[i].b2 = B2;
      data[i].b3 = B3;
      data[i].b4 = B4;
      data[i].b5 = B5;
      data[i].b6 = B6;

      // 保存最终结果（包含日期字段）
      result.push({
        timestamp, // 添加日期字段
        degreeB: controlDegree,
        degree: controlDegree > 100 ? 100 : controlDegree,
        mid: 100,
      });
    }

    return result;
  }
}

/**
 * 股票技术指标计算工具（静态方法版）
 */
export class TrendIndicators {
  /**
   * 计算HHJSJDA指标
   * @param {number} close - 收盘价
   * @param {number} open - 开盘价
   * @param {number} low - 最低价
   * @param {number} high - 最高价
   * @returns {number} - HHJSJDA值
   */
  static calculateHHJSJDA(close, open, low, high) {
    return (3 * close + open + low + high) / 6;
  }

  /**
   * 获取数组的历史值（类似REF函数）
   * @param {Array} array - 数据数组
   * @param {number} index - 当前索引
   * @param {number} n - 回溯的周期数
   * @returns {number} - 历史值，如果超出范围则返回0
   */
  static REF(array, index, n) {
    return index < n ? 0 : array[index - n];
  }

  /**
   * 计算HHJSJDB指标
   * @param {Array} HHJSJDAArray - HHJSJDA值的数组
   * @param {number} index - 当前索引
   * @returns {number} - HHJSJDB值
   */
  static calculateHHJSJDB(HHJSJDAArray, index) {
    if (index < 20) return 0; // 数据不足20个周期时返回0

    const weights = Array.from({ length: 20 }, (_, i) => 20 - i); // 权重从20到1
    weights.push(1); // 添加第20个权重（对应REF(HHJsjda,20)）

    let sum = 0;
    for (let i = 0; i <= 20; i++) {
      sum += weights[i] * this.REF(HHJSJDAArray, index, i);
    }

    return sum / 210;
  }

  /**
   * 计算简单移动平均线(MA)
   * @param {Array} array - 数据数组
   * @param {number} index - 当前索引
   * @param {number} period - 周期数
   * @returns {number} - MA值
   */
  static calculateMA(array, index, period) {
    if (index < period - 1) return 0; // 数据不足时返回0

    let sum = 0;
    for (let i = 0; i < period; i++) {
      sum += array[index - i];
    }

    return sum / period;
  }

  /**
   * 计算完整的HHJSJ指标系列
   * @param {Array} data - 包含open, high, low, close的K线数据数组
   * @returns {Object} - 包含HHJSJDA, HHJSJDB, HHJSJDC的对象
   */
  static result(data) {
    const HHJSJDA = data.map((item) => this.calculateHHJSJDA(item.close, item.open, item.low, item.high));

    const HHJSJDB = data.map((_, index) => this.calculateHHJSJDB(HHJSJDA, index));

    const HHJSJDC = data.map((_, index) => this.calculateMA(HHJSJDB, index, 5));

    const dataSet = [];

    HHJSJDA.forEach((_, index) => {
      dataSet.push({
        HHJSJDA: HHJSJDA[index],
        HHJSJDB: HHJSJDB[index],
        HHJSJDC: HHJSJDC[index],
      });
    });

    return dataSet;
  }
}

export class MajorIndicator {
  /**
   * 计算WY系列及XYS系列指标（带日期输出）
   * @param {Array} data - K线数据数组，每个元素需包含 timestamp（日期戳）、open, high, low, close, volume, amount, capital 字段
   * @returns {Array} - 包含所有指标和对应日期的对象数组
   */
  static result(data) {
    const result = []; // 存储每个周期的指标对象
    const WY1002 = [];
    const WY1003 = [];
    const WY1004 = [];

    // 用于存储历史XYS1和XYS2值，便于判断交叉
    const xys1Values = [];
    const xys2Values = [];

    // 遍历计算每个周期
    for (let i = 0; i < data.length; i++) {
      // 从数据中提取日期戳和其他字段
      const { timestamp, open, high, low, close, volume, amount, capital } = data[i];
      const WY1001 = close;

      // 计算WY系列EMA
      if (i === 0) {
        WY1002[i] = close;
        WY1003[i] = close;
        WY1004[i] = close;
      } else {
        WY1002[i] = this.calculateEMA(WY1002[i - 1], WY1001, 4);
        WY1003[i] = this.calculateEMA(WY1003[i - 1], WY1002[i], 4);
        WY1004[i] = this.calculateEMA(WY1004[i - 1], WY1003[i], 4);
      }

      // 计算XYS0（添加防除零处理）
      const refWY1004 = this.REF(WY1004, i, 1);
      const XYS0 = refWY1004 !== 0 ? ((WY1004[i] - refWY1004) / refWY1004) * 100 : 0; // 防止除以0

      // 计算PJGJ（平均价格）
      const PJGJ = volume === 0 ? 0 : amount / volume / 100;

      // 计算SSRYDJX（PJGJ的13日MA）
      const SSRYDJX = this.calculateMA(
        result.map((item) => item.PJGJ),
        i,
        13
      );

      // 计算SSRCJL/SSRCJE（成交量/成交额的13日EMA）
      const SSRCJL = i === 0 ? volume : this.calculateEMA(result[i - 1]?.SSRCJL || volume, volume, 13);

      const SSRCJE = i === 0 ? amount : this.calculateEMA(result[i - 1]?.SSRCJE || amount, amount, 13);

      // 计算SSRCBJX（资金流向指标，添加防除零处理）
      const SSRCBJX =
        SSRCJL === 0
          ? 0 // 防止除以0
          : SSRCJE / SSRCJL / 100;

      // 计算CYS13（市场盈亏指标，添加防除零处理）
      const CYS13 = SSRCBJX !== 0 ? ((close - SSRCBJX) / SSRCBJX) * 100 : 0;

      // 计算XYSHSL（换手率的13日EMA）
      const amountRate = capital === 0 ? 0 : (volume / capital) * 100;
      const XYSHSL = i === 0 ? amountRate : this.calculateEMA(result[i - 1]?.XYSHSL || amountRate, amountRate, 13);

      // 计算XYS1/XYS2（XYS0的MA）
      const XYS0Values = result.map((item) => item.XYS0);

      // 修复XYS1计算逻辑
      const XYS1 = this.calculateMA([...XYS0Values, XYS0], i, 2);
      const XYS2 = XYS0; // MA(XYS0,1) 等同于XYS0

      // 存储当前XYS1和XYS2值，用于后续交叉判断
      xys1Values.push(XYS1);
      xys2Values.push(XYS2);

      // 判断金叉(向上穿越)和死叉(向下穿越)
      let crossOver = false; // 金叉信号（XYS1从下向上穿越XYS2）
      let crossDown = false; // 死叉信号（XYS1从上向下穿越XYS2）

      if (i >= 1) {
        // 至少需要两个周期才能判断交叉
        const prevXYS1 = xys1Values[i - 1];
        const prevXYS2 = xys2Values[i - 1];
        crossDown = prevXYS1 <= prevXYS2 && XYS1 > XYS2;
        crossOver = prevXYS1 >= prevXYS2 && XYS1 < XYS2;
      }

      // 组装单个周期的指标对象（包含日期戳）
      result.push({
        timestamp, // 添加日期字段[1,7](@ref)
        WY1001,
        WY1002: WY1002[i],
        WY1003: WY1003[i],
        WY1004: WY1004[i],
        XYS0,
        PJGJ,
        SSRYDJX,
        SSRCJL,
        SSRCJE,
        SSRCBJX,
        CYS13,
        XYSHSL,
        XYS1,
        XYS2,
        crossOver, // 金叉信号
        crossDown, // 死叉信号
      });
    }

    return result;
  }

  /**
   * 计算EMA（指数移动平均）
   * @param {number} prevValue - 前一个值
   * @param {number} currentValue - 当前值
   * @param {number} period - 周期
   * @returns {number} - EMA值
   */
  static calculateEMA(prevValue, currentValue, period) {
    const multiplier = 2 / (period + 1);
    return currentValue * multiplier + prevValue * (1 - multiplier);
  }

  /**
   * 计算MA（简单移动平均）
   * @param {Array} values - 值数组
   * @param {number} currentIndex - 当前索引
   * @param {number} period - 周期
   * @returns {number} - MA值
   */
  static calculateMA(values, currentIndex, period) {
    // 当数据点不足时，使用已有的值计算平均值
    const availableValues = Math.min(currentIndex + 1, values.length);
    if (availableValues === 0) return 0;

    // 计算最近period个值的平均值（如果不足则计算所有可用值）
    let sum = 0;
    const startIdx = Math.max(0, currentIndex - period + 1);
    for (let i = startIdx; i <= currentIndex; i++) {
      if (i < values.length) {
        sum += values[i];
      }
    }

    return sum / (currentIndex - startIdx + 1);
  }

  /**
   * 获取REF值（前n个周期的值）
   * @param {Array} array - 数组
   * @param {number} currentIndex - 当前索引
   * @param {number} n - 周期数
   * @returns {number} - REF值
   */
  static REF(array, currentIndex, n) {
    return currentIndex < n ? 0 : array[currentIndex - n];
  }
}

/**
 * 股票指标计算类（静态方法版）
 */
export class FlowIndicator {
  /**
   * 计算资金流向指标（带日期输出）
   * @param {Array} data - K线数据数组，每个元素需包含timestamp（日期戳）和amount字段
   * @returns {Array} - 包含资金流向指标和日期的对象数组
   */
  static result(data) {
    const result = [];

    // 计算SMA(amount,10,1)/10000 (VAR1和VAR3逻辑相同)
    const var1Values = this.calculateSMA(
      data.map((item) => item.amount),
      10,
      1
    ).map((value) => value / 10000);

    for (let i = 0; i < data.length; i++) {
      // 获取当前数据点的日期戳
      const timestamp = data[i].timestamp || 0;
      const VAR1 = var1Values[i];
      const VAR2 = i > 0 ? var1Values[i - 1] : 0;

      // 存储结果（添加日期字段）
      result.push({
        timestamp, // 添加日期字段
        MAX: Math.max(VAR1, VAR2),
        MIN: Math.min(VAR1, VAR2),
        color: VAR1 > VAR2 ? 'red' : VAR1 < VAR2 ? 'green' : '#333',
        // 保留原有字段（可根据需要取消注释）
        // 资金运转: VAR1 > VAR2 ? VAR1 : 0,
        // 资金流失: VAR1 < VAR2 ? VAR1 : 0
      });
    }

    return result;
  }

  /**
   * 计算SMA（简单移动平均）
   * @param {Array} values - 数据数组
   * @param {number} period - 周期
   * @param {number} weight - 权重
   * @returns {Array} - SMA结果数组
   */
  static calculateSMA(values, period, weight) {
    const result = [];

    for (let i = 0; i < values.length; i++) {
      if (i === 0) {
        result.push(values[i]); // 第一个值直接返回
      } else {
        // SMA计算公式: (weight*当前值 + (period-weight)*前一个SMA) / period
        result.push((weight * values[i] + (period - weight) * result[i - 1]) / period);
      }
    }

    return result;
  }
}
