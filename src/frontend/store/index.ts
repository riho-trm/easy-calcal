import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

// リクエストヘッダーに含めるトークン
const authHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export default createStore({
  state: {
    // ログイン中のユーザー情報
    auth: {
      token: localStorage.getItem("token"),
      userId: -1,
      userName: "",
      email: "",
      isAdmin: 0, // 0:false,1:true
    },
    // 栄養成分一覧
    nutrients: {},
  },
  getters: {},
  mutations: {
    // ログイン時にユーザー情報を格納
    login(state, payload) {
      state.auth.token = payload.token;
      state.auth.userId = payload.id;
      state.auth.userName = payload.userName;
      state.auth.email = payload.email;
      state.auth.isAdmin = payload.isAdmin;
    },
    // ログアウト時にユーザー情報を削除
    logout(state) {
      state.auth.token = null;
      state.auth.userId = -1;
      state.auth.userName = "";
      state.auth.email = "";
      state.auth.isAdmin = 0;
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
        console.log(error);
      }
    },
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
    async getNutrients(context) {
      try {
        const res = await axios.get(
          "http://localhost:3000/nutrients/nutrientslist",
          authHeader
        );
        console.log(res);
        context.commit("setNutrients", res.data);
      } catch (error: any) {
        const errorMessage = error.response.data || error.message;
        console.log(errorMessage);
        return error;
      }
    },
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
