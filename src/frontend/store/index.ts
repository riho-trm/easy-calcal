import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

export default createStore({
  state: {
    auth: {
      token: localStorage.getItem("token"),
      userId: -1,
      userName: "",
      email: "",
      isAdmin: false,
    },
  },
  getters: {},
  mutations: {
    login(state, payload) {
      state.auth.token = payload.token;
      state.auth.userId = payload.id;
      state.auth.userName = payload.userName;
      state.auth.email = payload.email;
      state.auth.isAdmin = payload.isAdmin;
    },
    logout(state) {
      state.auth.token = null;
      state.auth.userId = -1;
      state.auth.userName = "";
      state.auth.email = "";
      state.auth.isAdmin = false;
    },
  },
  actions: {
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
        console.log(res);
      } catch (error) {
        console.log(error);
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
