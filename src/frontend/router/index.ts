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
import { authorizeToken } from "./guards";

const routes: Array<RouteRecordRaw> = [
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
  },
  {
    path: "/register",
    name: "Register",
    component: MembershipRegistration,
  },
  {
    path: "/adminmenu",
    name: "AdminMenu",
    component: AdminMenu,
  },
  {
    path: "/registerestimatedamount",
    name: "RegisterEstimatedAmount",
    component: RegisterEstimatedAmount,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/estimatedamountlist",
    name: "EstimatedAmountList",
    component: EstimatedAmountList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/editestimatedamount/:id",
    name: "EditEstimatedAmount",
    component: EditEstimatedAmount,
    meta: {
      requiresAuth: true,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(authorizeToken);

export default router;
