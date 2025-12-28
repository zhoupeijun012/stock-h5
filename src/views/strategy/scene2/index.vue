<template>
  <nav-warp
    title="T+0探底回升"
    :searchOptions="searchOptions"
    @confirm="onConfirm"
  >
    <list-grid
      v-if="filters.length > 0"
      :list="filters"
      :colNum="2"
      :labelWidth="10"
    ></list-grid>
    <ft-list :requestFunction="$api.getEtfList" ref="ft-list">
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
  name: "scene2",
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
          prop: "f40014",
          title: "金叉天数",
          component: "radio",
          defaultValue: [],
          value: ["2"],
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
        where: [...params, { field: "c1", operator: "eq", value: 0 }],
        matchKeys: [
          "f14",
          "f3",
          "f24",
          "f12",
          "f21",
          "f2",
          "f6",
          "f7",
          "f10",
          "f8",
          "f11",
          "c1",
          "f4",
          "f12",
          "f40014_XYS1",
        ],
      });
    },
    onConfirm() {
      this.getDetail();
    },
    toDetail(item) {
      this.$t0Detail({
        f12: item.f12,
        f14: item.f14,
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
