<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <Header v-if="$route.path !== '/register' && $route.path !== '/login'" />
  <router-view />
  <Footer v-if="$route.path !== '/register' && $route.path !== '/login'" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "ress";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

// ressのimportのみだがexport defaultが必要
export default defineComponent({
  components: { Header, Footer },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300;400;500&display=swap");
#app {
  font-family: "Kiwi Maru", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 62.5%; /*rem算出をしやすくするために*/

  position: relative;
  width: 100%;
  height: auto !important;
  height: 100%;
  min-height: 100vh;
  padding-bottom: 70px;
  .top-wrapper {
    height: auto;
  }
}

*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
