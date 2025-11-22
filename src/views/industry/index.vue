<template>
  <nav-warp title="行业" :searchOptions="searchOptions" @confirm="onConfirm">
    <ft-list :requestFunction="$api.getIndustryList" ref="ft-list">
      <template v-slot:list="{ list }">
        <stock-card
          v-for="item in list"
          :key="item.id"
          :info="item"
        ></stock-card>
      </template>
    </ft-list>
  </nav-warp>
</template>

<script>
import NavWarp from "@/components/nav-warp";
import FtList from "@/components/ft-list";
import StockCard from "@/components/stock-card";
import { getSearchParams } from "@/components/search-panel/index.js";
export default {
  name: "industry",
  components: {
    NavWarp,
    FtList,
    StockCard,
  },
  data() {
    return {
      searchOptions: [
               {
          prop: "f14",
          title: "名称",
          component: "input",
          defaultValue: '',
          value: '',
          operator: 'like',
          target: "f14",
          style: {
            position: 'sticky',
            top: '0',
            margin: '0 -10px 0',
            zIndex: '10',
          }
        },
        {
          prop: "f40014",
          title: "金叉天数",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            { label: "大于1天", value: "-1", realValue: [1] },
            { label: "1-2天", value: "1", realValue: [1, 2] },
            { label: "小于5天", value: "4", realValue: [0, 5] },
            { label: "5-10天", value: "5", realValue: [5, 10] },
          ],
        },
        {
          prop: "f41006",
          title: "周金叉数",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            { label: "大于1周", value: "-1", realValue: [1] },
            { label: "1-2周", value: "1", realValue: [1, 2] },
            { label: "小于5周", value: "4", realValue: [0, 5] },
            { label: "5-10周", value: "5", realValue: [5, 10] },
          ],
        },
        {
          prop: "f40016",
          title: "控盘程度",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            { label: "大于50", value: "3", realValue: [50] },
            { label: "大于100", value: "5", realValue: [100] },
            { label: "大于150", value: "6", realValue: [150] },
            { label: "大于200", value: "7", realValue: [200] },
          ],
        },
        {
          prop: "f40006",
          title: "924涨幅",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            
            { label: "小于20%", value: "4", realValue: [0, 2000] },
            { label: "20%-40%", value: "5", realValue: [2000, 4000] },
            { label: "40%-60%", value: "6", realValue: [4000, 6000] },
            { label: "60%-100%", value: "7", realValue: [6000, 10000] },
            { label: "大于100%", value: "8", realValue: [10000] },
          ],
        },
        {
          prop: "f40008",
          title: "多头排列",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            { label: "小于5天", value: "1", realValue: [0, 5] },
            { label: "小于10天", value: "3", realValue: [0, 10] },
            { label: "10-20天", value: "4", realValue: [10, 20] },
            { label: "大于20天", value: "5", realValue: [20] },
          ],
        },
        {
          prop: "f40009",
          title: "排列涨幅",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            { label: "1%-10%", value: "2", realValue: [0, 1000] },
            { label: "10%-20%", value: "3", realValue: [1000, 2000] },
            { label: "20%-40%", value: "5", realValue: [2000, 4000] },
            { label: "40%-60%", value: "6", realValue: [4000, 6000] },
            { label: "60%-100%", value: "7", realValue: [6000, 10000] },
            { label: "大于100%", value: "8", realValue: [10000] },
          ],
        },
        {
          prop: "f40010",
          title: "60日均线",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            { label: "小于5天", value: "1", realValue: [0, 5] },
            { label: "6-10天", value: "2", realValue: [6, 10] },
            { label: "10-20天", value: "4", realValue: [10, 20] },
            { label: "大于20天", value: "5", realValue: [20] },
          ],
        },
        {
          prop: "f40011",
          title: "均线涨幅",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            
            { label: "5%-10%", value: "2", realValue: [500, 1000] },
            { label: "10%-20%", value: "3", realValue: [1000, 2000] },
            { label: "20%-40%", value: "5", realValue: [2000, 4000] },
            { label: "40%-60%", value: "6", realValue: [4000, 6000] },
            { label: "60%-100%", value: "7", realValue: [6000, 10000] },
            { label: "大于100%", value: "8", realValue: [10000] },
          ],
        },
        {
          prop: "f40012",
          title: "趋势天数",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            { label: "小于5天", value: "1", realValue: [0, 5] },
            { label: "6-10天", value: "2", realValue: [6, 10] },
            { label: "小于10天", value: "3", realValue: [0, 10] },
            { label: "10-20天", value: "4", realValue: [10, 20] },
          ],
        },
        {
          prop: "f40017",
          title: "资金流入",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            { label: "小于5天", value: "1", realValue: [0, 5] },
            { label: "6-10天", value: "2", realValue: [6, 10] },
            { label: "小于10天", value: "3", realValue: [0, 10] },
            { label: "10-20天", value: "4", realValue: [10, 20] },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      const params = getSearchParams(this.searchOptions);
      this.$refs["ft-list"].query({
        order: [{ prop: "f3", order: "descending" }],
        where: params,
        matchKeys: [
          "f14",
          "f3",
          "f40014",
          "f41006",
          "f40006",
          "f40008",
          "f40009",
          "f40010",
          "f40011",
          "f40012",
          "f40013",
          "f40017",
          "f6",
          "c_f103",
          "f12",
          "f21",
          "f20",
          "f2",
          "f12",
          "f7",
          "f23",
          "c_f100",
          "c_f102",
          "f8",
          "f9",
          "f11",
          "f41003",
          "f41004",
          "f24",
          "f62",
          "f267",
          "f164",
          "f63",
          "f17",
          "f2",
          "f15",
          "f16",
          "f5",
          "f4",
          "f41006",
          "f40016",
        ],
      });
    },
    onConfirm() {
      this.getDetail();
    },
  },
};
</script>

<style lang="less" scoped></style>
