<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "ress";

// ressのimportのみだがexport defaultが必要
export default defineComponent({
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
