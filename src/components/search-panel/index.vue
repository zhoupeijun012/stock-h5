<template>
  <van-popup
    :value="value"
    @input="(val) => $emit('input', val)"
    :closeable="false"
    position="bottom"
    round
    :style="{ width: '100%', height: '90%' }"
  >
    <div class="panel-container" >
      <div class="panel-content" ref="panelContainer">
        <template v-for="item in filterOptions">
          <template v-if="item.component === 'input'">
            <div :style="item.style || {}" :key="item.prop">
              <van-search
                placeholder="请输入搜索关键词"
                background="rgb(79, 192, 141)"
                v-model.trim="item.value"
              />
            </div>
          </template>
          <template v-if="item.component === 'radio'">
            <div class="panel-item" :key="item.prop">
              <div class="panel-item-title">{{ item.title }}</div>
              <div :style="item.style || {}">
                <van-checkbox-group
                  :max="1"
                  class="radio-group"
                  :value="item.value"
                  direction="horizontal"
                >
                  <van-checkbox
                    :name="option.value"
                    v-for="(option, index) in item.options"
                    :key="index"
                    @click="
                      () => {
                        if (
                          item.value?.length > 0 &&
                          item.value[0] === option.value
                        ) {
                          item.value = [];
                        } else {
                          item.value = [option.value];
                        }
                      }
                    "
                  >
                    <template #icon="props">
                      <van-button
                        type="primary"
                        :plain="!props.checked"
                        size="small"
                        >{{ option.label }}</van-button
                      >
                    </template>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
          </template>
        </template>
      </div>
      <div class="panel-bottom">
        <van-button
          round
          type="danger"
          v-if="showClear"
          class="panel-bottom-btn"
          @click="onClear"
          >清空</van-button
        >
        <van-button
          round
          type="primary"
          class="panel-bottom-btn"
          @click="onApply"
          >应用</van-button
        >
      </div>
    </div>
  </van-popup>
</template>
<script lang="js">
export default {
 name:'search-panel',
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
        filterOptions: []
    };
  },
  computed: {
    showClear() {
      return this.filterOptions.some((item) => {
        if(item.component === 'radio') {
          return item.value?.length > 0;
        }
        if(item.component === 'input') {
          return item.value?.length > 0;
        }
        return false;
      });
    },
  },
  methods: {
    onClear() {
        this.filterOptions.forEach((item) => {
          if(item.component === 'radio') {
            item.value = [];
          }
          if(item.component === 'input') {
            item.value = '';
          }
        });
        this.onApply();
    },
    onApply() {
      // 同时使用input事件和update:value事件确保弹窗能正确关闭
      this.$emit('input', false);
      this.$emit('update:value', false);
      // 赋值回去
      this.options.forEach((item) => {
        const findObj = this.filterOptions.find((filterItem) => filterItem.prop === item.prop);
        if(findObj) {
          Object.assign(item, findObj);
        }
      });
      this.$listeners.confirm && this.$listeners.confirm(this.filterOptions);
    },
  },
  watch: {
    value(newVal) {
      if(newVal) {
        this.filterOptions = JSON.parse(JSON.stringify(this.options || []));
        // 滚动到顶部
        this.$nextTick(() => {
          this.$refs.panelContainer.scrollTop = 0;
        });
      }
    }
  }
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
  border-top: 1px solid #ebedf0;
}
.panel-bottom-btn {
  flex: 1;
}
.panel-item {
  padding-top: 10px;
  border-bottom: 1px solid #ebedf0;
  .panel-item-title {
    line-height: 20px;
    margin-bottom: 12px;
  }
  &:last-child {
    border-bottom: none;
  }
}
.radio-group {
  font-size: 14px;
  line-height: 14px;
  /deep/.van-checkbox__icon {
    height: auto;
    margin-bottom: 10px;
  }
}
</style>
