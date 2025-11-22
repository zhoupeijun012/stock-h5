<template>
  <van-popup
    :value="value"
    @input="$emit('update:value', false)"
    closeable
    close-icon="cross"
    position="bottom"
    :style="{ height: '80%' }"
    round
    close-icon-position="top-right"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="panel-container">
      <div class="panel-top"></div>
      <div class="panel-content">
        <div v-for="item in options" :key="item.prop" class="panel-item">
          <div class="panel-item-title">{{ item.title }}</div>
          <div v-if="item.component === 'radio'">
            <van-radio-group class="radio-group" v-model="item.defaultValue" direction="horizontal">
              <van-radio :name="option.value" v-for="(option, index) in item.options" :key="index">
                <template #icon="props">
                  <van-button type="primary" :plain="!props.checked" size="small">{{ option.label }}</van-button>
                </template>
              </van-radio>
            </van-radio-group>
          </div>
        </div>
      </div>
      <div class="panel-bottom">
        <van-button round type="danger" class="panel-bottom-btn"
          >清空</van-button
        >
        <van-button round type="primary" class="panel-bottom-btn"
          >应用</van-button
        >
      </div>
    </div>
  </van-popup>
</template>
<script lang="js">
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
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
<style lang="less" scoped>
.panel-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.panel-top {
  height: 10%;
}
.panel-content {
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  padding: 0 10px;
}
.panel-bottom {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  padding: 0 10px;
}
.panel-bottom-btn {
  flex: 1;
}
.panel-item {
    padding: 10px 0;
    border-bottom: 1px solid #ebedf0;
    .panel-item-title {
        line-height: 20px;
        margin-bottom: 12px;
    }
}
.radio-group {
    font-size: 14px;
    line-height: 14px;
    /deep/.van-radio__icon {
        height: auto;
        margin-bottom: 10px;
    }
}
</style>
