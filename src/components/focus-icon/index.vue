<template>
  <van-icon name="like" size="24" color="red" v-if="isFocus" @click.stop.prevent="handDelete" />
  <van-icon name="like-o" size="24" v-else @click.stop.prevent="handAdd" />
</template>
<script>
import * as StoreTypes from "@/store/store_types";
export default {
  name: "focus-icon",
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isFocus() {
      return this.$store.state.focusList.includes(this.info?.f12);
    },
  },
  methods: {
    handAdd() {
      this.$store.dispatch(StoreTypes.ACTION_FOCUS_ADD, this.info);
    },
    handDelete() {
      this.$store.dispatch(StoreTypes.ACTION_FOCUS_DELETE, this.info);
    },
  },
};
</script>
