import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";
import * as StoreTypes from "@/store/store_types";
Vue.use(VueRouter);

export const routes = [
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/home/index.vue"),
    meta: { title: "首页", showTab: true, keepAlive: true, level: 1 },
  },
  {
    path: "/strategy",
    name: "strategy",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/strategy/index.vue"),
    meta: { title: "策略", showTab: true, keepAlive: true, level: 1 },
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/favorite/index.vue"),
    meta: { title: "收藏", showTab: true, keepAlive: true, level: 1 },
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/profile/index.vue"),
    meta: { title: "我的", showTab: true, keepAlive: true, level: 1 },
  },
  {
    path: "/stock",
    name: "stock",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/stock/index.vue"),
    meta: { title: "股票列表", keepAlive: true, level: 2 },
  },
  {
    path: "/industry",
    name: "industry",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/industry/index.vue"),
    meta: { title: "行业列表", keepAlive: true, level: 2 },
  },
  {
    path: "/concept",
    name: "concept",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/concept/index.vue"),
    meta: { title: "概念列表", keepAlive: true, level: 2 },
  },
  {
    path: "/region",
    name: "region",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/region/index.vue"),
    meta: { title: "区域列表", keepAlive: true, level: 2 },
  },
  {
    path: "/t+0",
    name: "t0",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/t+0/index.vue"),
    meta: { title: "T+0列表", keepAlive: true, level: 2 },
  },
  {
    path: "/t+1",
    name: "t1",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/t+1/index.vue"),
    meta: { title: "T+1列表", keepAlive: true, level: 2 },
  },
  {
    path: "/lof",
    name: "lof",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/lof/index.vue"),
    meta: { title: "LOF列表", keepAlive: true, level: 2 },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/login/index.vue"),
    meta: { title: "登录", noAuth: true, keepAlive: false, level: 1 },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/register/index.vue"),
    meta: { title: "注册", noAuth: true, keepAlive: false, level: 1 },
  },
  {
    path: "/stock-detail",
    name: "stock-detail",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/stock/stock-detail/index.vue"),
    meta: { title: "股票详情", keepAlive: false, level: 3 },
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/user/index.vue"),
    meta: { title: "用户", keepAlive: true, keepAlive: true, level: 2 },
  },
  {
    path: "/login-record",
    name: "record",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/record/index.vue"),
    meta: { title: "登录记录", keepAlive: true, level: 2 },
  },
  {
    path: "/task-queue",
    name: "task-queue",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/task-queue/index.vue"),
    meta: { title: "任务队列", keepAlive: true, level: 2 },
  },
  {
    path: "/data-manage",
    name: "data-manage",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/data-manage/index.vue"),
    meta: { title: "数据管理", keepAlive: true, level: 2 },
  },
    {
    path: "*",
    redirect: {
      name: "home",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const baseRoutes = ["home", "strategy", "favorite", "profile"];
  if (from.meta?.keepAlive && to.meta?.level >= from.meta?.level) {
    const includeRoutes = [
      ...baseRoutes,
      ...store.state.includeRoutes,
      to.name,
    ];
    store.commit(
      StoreTypes.UPDATE_INCLUDE_ROUTES,
      Array.from(new Set(includeRoutes))
    );
  } else {
    const spliceArr = store.state.includeRoutes.filter(
      (item) => item !== from.name
    );
    const includeRoutes = [...baseRoutes, ...spliceArr];
    store.commit(
      StoreTypes.UPDATE_INCLUDE_ROUTES,
      Array.from(new Set(includeRoutes))
    );
  }
  Vue.nextTick(() => {
    Vue.nextTick  (() => {
      if (to?.meta?.noAuth) {
        next();
      } else {
        store.state.token ? next() : next("/login", { replace: true });
      }
    });
  });
});

export default router;
