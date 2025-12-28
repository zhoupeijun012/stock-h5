<template>
  <nav-warp title="用户管理">
    <ft-list :requestFunction="$api.userList" ref="ft-list">
      <template v-slot:list="{ list }">
        <van-swipe-cell v-for="item in list" :key="item.id">
          <div  class="ft-card-item" style="margin-bottom:0">
            <div class="card-name" style="font-size: 20px; line-height: 24px">
              {{ item.username }}
            </div>
            <van-row>
              <van-col span="6">角色：</van-col>
              <van-col span="18" >
                {{ item.isAdmin ? "管理员" : "普通用户" }}
              </van-col>
            </van-row>
            <van-row>
              <van-col span="6">是否可用：</van-col>
              <van-col
                span="18"
                :style="{ color: item.isApproved ? 'gray':'red' }"
              >
                {{ item.isApproved ? "已认证" : "未认证" }}
              </van-col>
            </van-row>
            <van-row>
              <van-col span="6">创建时间：</van-col>
              <van-col span="18" :style="{ color: 'gray' }">
                {{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
              </van-col>
            </van-row>
          </div>
          <template #right v-if="!item.isAdmin">
            <van-button style="height:100%" class="action-btn" square type="danger" v-if="item.isApproved" text="禁用" @click="handleStatus(item,false)" />
            <van-button style="height:100%" class="action-btn" square type="primary" v-if="!item.isApproved" text="启用" @click="handleStatus(item,true)" />
          </template>
        </van-swipe-cell>
      </template>
    </ft-list>
  </nav-warp>
</template>

<script>
import NavWarp from "@/components/nav-warp";
import FtList from "@/components/ft-list";
import dayjs from "dayjs";
import { Dialog, Toast } from "vant";
export default {
  name: "user",
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
      matchKeys: ["username", "isAdmin", "isApproved", "createdAt"],
    });
  },
  methods: {
    dayjs,
    handleStatus(item, status) {
      Dialog.confirm({
        title: "确认操作",
        message: `是否${status ? "启用" : "禁用"}用户${item.username}？`,
      }).then(() => {
        this.$api.userApprove({
          userId: item.id,
          isApproved: status,
        }).then((res) => {
            item.isApproved = status;
            Toast.success({
              message: "操作成功",
              icon: '123'
            });
        }).catch((err) => {
          Toast.error({
            message: err.message,
            icon: '123'
          });
        });
      });
    },
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
.action-btn {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
</style>
