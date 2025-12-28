<template>
  <nav-warp
    title="龙头探底回升"
    :searchOptions="searchOptions"
    @confirm="onConfirm"
  >
    <list-grid
      v-if="filters.length > 0"
      :list="filters"
      :colNum="2"
      :labelWidth="10"
    ></list-grid>
    <ft-list :requestFunction="$api.getStockList" ref="ft-list">
      <template v-slot:list="{ list }">
        <stock-card
          v-for="item in list"
          :key="item.id"
          :info="item"
          @click.native="toDetail(item)"
        ></stock-card>
      </template>
    </ft-list>
  </nav-warp>
</template>

<script>
import NavWarp from "@/components/nav-warp";
import FtList from "@/components/ft-list";
import StockCard from "@/components/stock-card";
import ListGrid from "@/components/list-grid";
import {
  getSearchParams,
  getSearchFilters,
} from "@/components/search-panel/index.js";
export default {
  name: "scene1",
  components: {
    NavWarp,
    FtList,
    StockCard,
    ListGrid,
  },
  data() {
    return {
      searchOptions: [
        {
          prop: "f14",
          title: "名称",
          component: "input",
          defaultValue: "",
          value: "",
          operator: "like",
          target: "f14",
          style: {
            position: "sticky",
            top: "0",
            margin: "0 -10px 0",
            zIndex: "10",
          },
        },
        {
          prop: "f6666",
          title: "上市地区",
          component: "radio",
          defaultValue: [],
          value: ["0"],
          operator: "orStart",
          target: "f12",
          options: [
            { label: "主板", value: "0", realValue: ["00", "60"] },
            { label: "创业", value: "1", realValue: ["300"] },
            { label: "科创", value: "2", realValue: ["68"] },
            { label: "北证", value: "3", realValue: ["8"] },
          ],
        },
        {
          prop: "f21",
          title: "流通市值",
          component: "radio",
          defaultValue: [],
          value: ['7'],
          operator: "between",
          options: [
            { label: "小于20亿", value: "1", realValue: [0, 20e8] },
            { label: "20-40亿", value: "2", realValue: [20e8, 40e8] },
            { label: "40-100亿", value: "4", realValue: [40e8, 100e8] },
            { label: "100-200亿", value: "5", realValue: [100e8, 200e8] },
            { label: "200-500亿", value: "6", realValue: [200e8, 500e8] },
            { label: "大于500亿", value: "7", realValue: [500e8] },
          ],
        },
        {
          prop: "f40014",
          title: "金叉天数",
          component: "radio",
          defaultValue: [],
          value: ['2'],
          operator: "between",
          options: [
            { label: "1天", value: "1", realValue: [1, 1] },
            { label: "1-3天", value: "2", realValue: [1, 3] },
            { label: "小于5天", value: "4", realValue: [0, 5] },
            { label: "5-10天", value: "5", realValue: [5, 10] },
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
            { label: "1-5天", value: "1", realValue: [0, 5] },
            { label: "6-10天", value: "2", realValue: [6, 10] },
            { label: "10-20天", value: "4", realValue: [10, 20] },
            { label: "超20天", value: "5", realValue: [20] },
          ],
        },
        {
          prop: "f3",
          title: "当日涨幅",
          component: "radio",
          defaultValue: [],
          value: [],
          operator: "between",
          options: [
            { label: "小于2%", value: "1", realValue: [0, 200] },
            { label: "2-4%", value: "2", realValue: [200, 400] },
            { label: "4-6%", value: "4", realValue: [400, 600] },
            { label: "大于6%", value: "6", realValue: [600] },
          ],
        },
      ],
    };
  },
  computed: {
    filters() {
      return getSearchFilters(this.searchOptions);
    },
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      const params = getSearchParams(this.searchOptions);
      this.$refs["ft-list"].query({
        order: [{ prop: "f40014_XYS1", order: "ascending" }],
        where: [...params],
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
          "f40014_XYS1",
        ],
      });
    },
    onConfirm() {
      this.getDetail();
    },
    toDetail(item) {
       this.$stockDetail({
        f12: item.f12,
        f14: item.f14,
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
