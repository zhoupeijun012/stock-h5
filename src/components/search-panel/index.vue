<template>
  <van-popup
    :value="value"
    @input="$emit('update:value', false)"
    closeable
    close-icon="cross"
    position="bottom"
    :style="{  height: '80%' }"
    round
    close-icon-position="top-right"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- <van-search
      v-model="searchText"
      placeholder="请输入股票名称或代码"
      clearable
      @search="onSearch"
    /> -->
  </van-popup>
</template>
<script lang="js">
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", this.searchText);
    },
  },
}
</script>
