import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
// import LoginTest from "../views/LoginTest.vue";
import LoginView from "../views/LoginView.vue";
import TopView from "../views/TopView.vue";
import Header from "../components/Header.vue";
import { authorizeToken } from "./guards";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  // {
  //   path: "/logintest",
  //   name: "loginTest",
  //   component: LoginTest,
  // },
  {
    path: "/topview",
    name: "TopView",
    component: TopView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/loginview",
    name: "LoginView",
    component: LoginView,
  },
  // あとで消す
  {
    path: "/header",
    name: "Header",
    component: Header,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(authorizeToken);

export default router;
