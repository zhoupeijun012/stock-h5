import Vue from "vue";
import VueRouter from "vue-router";
import TabLayout from "@/components/tab-layout/index.vue";
import store from "@/store/index";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "root",
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
    store.state.token ? next() : window.location.replace('/login');
  }
});

export default router;
