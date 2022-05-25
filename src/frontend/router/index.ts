import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
// import LoginTest from "../views/LoginTest.vue";
import TopView from "../views/TopView.vue";
import MembershipRegistration from "../views/MembershipRegistration.vue";
import TopMenu from "../views/TopMenu.vue";
import { authorizeToken } from "./guards";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
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
    path: "/register",
    name: "Register",
    component: MembershipRegistration,
  },
  {
    path: "/topmenu",
    name: "TopMenu",
    component: TopMenu,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(authorizeToken);

export default router;
