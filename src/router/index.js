import Vue from "vue";
import VueRouter from "vue-router";
import TabLayout from "@/components/tab-layout/index.vue";
import NavLayout from "@/components/nav-layout/index.vue";
import store from "@/store/index";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/tab",
    name: "tab",
    component: TabLayout,
    children: [
      {
        path: "home",
        name: "home",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/home/index.vue"),
        meta: { title: "首页" },
      },
      {
        path: "strategy",
        name: "strategy",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/strategy/index.vue"),
        meta: { title: "策略" },
      },
      {
        path: "favorite",
        name: "favorite",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/favorite/index.vue"),
        meta: { title: "收藏" },
      },
      {
        path: "profile",
        name: "profile",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/profile/index.vue"),
        meta: { title: "我的" },
      },
    ],
  },
  {
    path: "/nav",
    name: "nav",
    component: NavLayout,
    children: [
      {
        path: "stock",
        name: "stock",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/stock/index.vue"),
        meta: { title: "股票列表" },
      },
      {
        path: "industry",
        name: "industry",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/industry/index.vue"),
        meta: { title: "行业列表" },
      },
      {
        path: "concept",
        name: "concept",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/concept/index.vue"),
        meta: { title: "概念列表" },
      },
      {
        path: "region",
        name: "region",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/region/index.vue"),
        meta: { title: "区域列表" },
      },
      {
        path: "t+0",
        name: "t+0",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/t+0/index.vue"),
        meta: { title: "T+0列表" },
      },
      {
        path: "t+1",
        name: "t+1",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/t+1/index.vue"),
        meta: { title: "T+1列表" },
      },
      {
        path: "lof",
        name: "lof",
        component: () =>
          import(/* webpackChunkName:"stock" */ "@/views/lof/index.vue"),
        meta: { title: "LOF列表" },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/login/index.vue"),
    meta: { title: "登录", noAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/register/index.vue"),
    meta: { title: "注册", noAuth: true },
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
  if (to?.meta?.noAuth) {
    next();
  } else {
    store.state.token ? next() : window.location.replace("/login");
  }
});

export default router;
