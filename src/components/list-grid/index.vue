<template>
  <van-row class="list-grid">
    <van-col
      :span="24 / colNum"
      class="list-item"
      v-for="(item, index) in list"
      :key="'item-' + index"
    >
      <van-col :span="labelWidth" class="list-item-label">
        {{ item.title }}</van-col
      >
      <van-col
        :span="24 - labelWidth"
        class="list-item-text"
        :style="item.style"
      >
        {{ item.value }}
      </van-col>
    </van-col>
  </van-row>
</template>
<script>
export default {
  name: "list-grid",
  props: {
    colNum: {
      type: Number,
      default: 4,
    },
    labelWidth: {
      type: Number,
      default: 12,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    itemSpan() {
      return 24 / this.colNum;
    },
  },
};
</script>
<style lang="less" scoped>
.list-grid {
  background: #fff;
  padding: 10px;
  box-shadow: rgba(100, 101, 102, 0.12) 0px 2px 4px 0px;
  z-index: 100;
  .list-item-label {
    text-align: justify;
    text-align-last: justify;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .list-item-text {
    color: gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &::before {
      content: ":";
      color: gray !important;
    }
  }
}
</style>
