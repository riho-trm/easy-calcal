import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import MembershipRegistration from "../views/MembershipRegistration.vue";
import TopMenu from "../views/TopMenu.vue";
import AdminMenu from "../views/AdminMenu.vue";
import RegisterEstimatedAmount from "../views/RegisterEstimatedAmount.vue";
import EstimatedAmountList from "../views/EstimatedAmountList.vue";
import EditEstimatedAmount from "../views/EditEstimatedAmount.vue";
import CalcCalories from "../views/CalcCalories.vue";
import MyPage from "../views/MyPage.vue";
import MyDataList from "../views/MyDataList.vue";
import MyDataDetail from "../views/MyDataDetail.vue";
import NotFound from "../views/NotFound.vue";
import { authorizeToken } from "./guards";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
  {
    path: "/",
    name: "TopMenu",
    component: TopMenu,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    props: true,
    beforeEnter: (to, from, next) => {
      if (
        store.state.auth.token === null ||
        store.state.auth.token === undefined
      ) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: MembershipRegistration,
    beforeEnter: (to, from, next) => {
      if (
        store.state.auth.token === null ||
        store.state.auth.token === undefined
      ) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/adminmenu",
    name: "AdminMenu",
    component: AdminMenu,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.auth.isAdmin === 0) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/registerestimatedamount",
    name: "RegisterEstimatedAmount",
    component: RegisterEstimatedAmount,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.auth.isAdmin === 0) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/estimatedamountlist",
    name: "EstimatedAmountList",
    component: EstimatedAmountList,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.auth.isAdmin === 0) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/editestimatedamount/:id",
    name: "EditEstimatedAmount",
    component: EditEstimatedAmount,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      if (store.state.auth.isAdmin === 0) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/calccalories",
    name: "CalcCalories",
    component: CalcCalories,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mydatalist",
    name: "MyDataList",
    component: MyDataList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mydatadetail/:id",
    name: "MyDataDetail",
    component: MyDataDetail,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(authorizeToken);

export default router;
