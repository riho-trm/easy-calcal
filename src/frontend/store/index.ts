import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import { Nutrients } from "@/types/task";

// リクエストヘッダーに含めるトークン
// let authHeader = {};

export default createStore({
  state: {
    // リクエストヘッダーに含めるトークン
    authHeader: {
      headers: {
        Authorization: ``,
      },
    },
    // ログイン中のユーザー情報
    auth: {
      token: localStorage.getItem("token"),
      userId: -1,
      userName: "",
      email: "",
      isAdmin: 0, // 0:false,1:true
    },
    // 栄養成分一覧
    nutrients: {} as Nutrients,
  },
  getters: {
    getSugestList(state) {
      const list = [];
      for (const nutrient in state.nutrients) {
        list.push(state.nutrients[nutrient].food_name);
      }
      return list;
    },
  },
  mutations: {
    // ログイン時にユーザー情報を格納
    login(state, payload) {
      state.auth.token = payload.token;
      state.auth.userId = payload.id;
      state.auth.userName = payload.userName;
      state.auth.email = payload.email;
      state.auth.isAdmin = payload.isAdmin;
      state.authHeader = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
    },
    // ログアウト時にユーザー情報を削除
    logout(state) {
      state.auth.token = null;
      state.auth.userId = -1;
      state.auth.userName = "";
      state.auth.email = "";
      state.auth.isAdmin = 0;
      state.authHeader = {
        headers: {
          Authorization: "",
        },
      };
    },
    // 栄養成分一覧を格納
    setNutrients(state, payload) {
      state.nutrients = payload;
    },
  },
  actions: {
    // ログイン
    async login(context, data) {
      try {
        const sendData = {
          email: data.email,
          password: data.password,
        };
        const res = await axios.post(
          "http://localhost:3000/login/login",
          sendData
        );
        if (res.data.status === "error") {
          return res.data;
        } else {
          localStorage.setItem("token", res.data.token);
          context.commit("login", res.data);
          context.dispatch("getNutrients");
          return res.data;
        }
      } catch (error) {
        console.log("storeのloginのエラー");
        console.log(error);
      }
    },
    // 会員登録
    async register(context, data) {
      try {
        const sendData = {
          email: data.email,
          userName: data.userName,
          password: data.password,
          isadmin: false,
        };
        const res = await axios.post(
          "http://localhost:3000/login/register",
          sendData
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    // 栄養素一覧取得
    async getNutrients(context) {
      console.log(context.state.authHeader);
      try {
        const res = await axios.get(
          "http://localhost:3000/nutrients/nutrientslist",
          context.state.authHeader
        );
        console.log("storeのgetNutrientsの成功res");
        console.log(res);
        context.commit("setNutrients", res.data);
      } catch (error: any) {
        const errorMessage = error.response.data || error.message;
        console.log("storeのgetNutrientsのエラー");
        console.log(errorMessage);
        console.log(context.state.authHeader);
        return error;
      }
    },
    // 目安量登録
    async saveEstimatedQuantity(context, data) {
      const targetNutrient = context.state.nutrients.find(
        (n) => n.food_name === data.nutrientsListFoodName
      );
      const sendData = {
        classificationId: targetNutrient.classification_id,
        nutrientId: targetNutrient.id,
        foodNameTodisplay: data.toDisplayFoodName,
        unit: data.unit,
        standardQuantity: data.standardQuantity,
        includeDisposal: data.includeDisposal,
      };
      try {
        const res = await axios.post(
          "http://localhost:3000/nutrients/registestimatedquantity",
          sendData,
          context.state.authHeader
        );
      } catch (error: any) {
        const errorMessage = error.response.data || error.message;
        console.log("storeのsaveEstimatedQuantityのエラー");
        console.log(errorMessage);
        console.log(context.state.authHeader);
        return error;
      }
    },
    // 保存済み目安量一覧取得
    async getEstimatedQuantity(context) {
      try {
        const res = await axios.get(
          "http://localhost:3000/nutrients/estimatedquantitylist",
          context.state.authHeader
        );
        console.log("storeのgetEstimatedQuantityの成功res");
        console.log(res.data);
        return res.data;
      } catch (error: any) {
        const errorMessage = error.response.data || error.message;
        console.log("storeのgetEstimatedQuantityのエラー");
        console.log(errorMessage);
        console.log(context.state.authHeader);
        return error;
      }
    },
    // 登録済目安量削除
    async deleteEstimatedQuantity(context, id) {
      try {
        const res = await axios.delete(
          "http://localhost:3000/nutrients/deleteestimatedquantity",
          // deleteメソッドでは引数を3つ取れないのでこの形で渡す
          {
            data: { id },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        return res;
      } catch (error: any) {
        const errorMessage = error.response.data || error.message;
        console.log("storeのdeleteEstimatedQuantityのエラー");
        console.log(errorMessage);
        console.log(context.state.authHeader);
        return error;
      }
    },

    // ログアウト
    logout(context) {
      localStorage.removeItem("token");
      context.commit("logout");
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      // ストレージのキーを指定(変更してなければデフォルトvuex)
      key: "vuex",
      // ストレージの種類を指定
      storage: window.sessionStorage,
    }),
  ],
});
