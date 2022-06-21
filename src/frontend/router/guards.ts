import store from "../store";

export const authorizeToken = (to: any, from: any, next: any) => {
  console.log("authorizeTokenが呼ばれた");
  console.log(store.state.auth.token);
  if (
    to.matched.some((page: any) => page.meta.requiresAuth) &&
    (store.state.auth.token === null || store.state.auth.token === undefined)
  ) {
    next("/login");
  } else {
    next();
  }
};
