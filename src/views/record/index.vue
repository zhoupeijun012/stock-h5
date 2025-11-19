<template>
  <nav-warp title="登录记录">
    <ft-list :requestFunction="$api.userLoginRecords" ref="ft-list">
      <template v-slot:list="{ list }">
        <div class="ft-card-item" v-for="(item, index) in list" :key="index">
          <div class="card-name" style="font-size: 20px; line-height: 24px">
            {{ item.username }}
          </div>
          <van-row>
            <van-col span="6">登录IP：</van-col>
            <van-col span="18">
              {{ item.loginIp }}
            </van-col>
          </van-row>
          <van-row>
            <van-col span="6">登录时间：</van-col>
            <van-col span="18">
              {{ dayjs(item.loginTime).format("YYYY-MM-DD HH:mm:ss") }}
            </van-col>
          </van-row>
        </div>
      </template>
    </ft-list>
  </nav-warp>
</template>

<script>
import NavWarp from "@/components/nav-warp";
import FtList from "@/components/ft-list";
import dayjs from "dayjs";

export default {
  name: "record",
  components: {
    NavWarp,
    FtList,
  },
  data() {
    return {};
  },
  mounted() {
    this.$refs["ft-list"].query({
      order: [{ prop: "createdAt", order: "descending" }],
      where: [],
      matchKeys: ["username", "loginIp", "loginTime"],
    });
  },
  methods: {
    dayjs,
  },
};
</script>

<style lang="less" scoped>
.ft-card-item {
  border-radius: 8px;
  background: #fff;
  margin-bottom: 8px;
  position: relative;
  padding: 6px 8px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  margin: 10px;
  &.gold {
    background: rgba(255, 215, 0, 0.08);
  }
  &.silver {
    background: rgba(218, 112, 214, 0.08);
  }
  &:active {
    background: #f3f4f5;
  }
}
.card-name {
  color: red;
  font-size: 16px;
}
</style>
