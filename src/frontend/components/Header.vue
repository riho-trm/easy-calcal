<template>
  <header>
    <div class="container">
      <div class="title">
        <router-link to="/">title（仮）</router-link>
      </div>
      <div class="link">
        <router-link to="/">カロリー計算</router-link>
        <router-link to="/">Myデータ</router-link>
        <router-link to="/">マイページ</router-link>
        <router-link to="/" v-if="isAdmin === true">管理者メニュー</router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const isAdmin = computed(() => {
      return store.state.auth.isAdmin;
    });
    return {
      isAdmin,
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 80px;
  background: rgba(255, 255, 255, 0.8);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  .container {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    position: relative;
    a {
      text-decoration: none;
      color: black;
    }
    .title {
      width: 40%;
      text-align: left;
      a {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
      }
    }
    .link {
      width: 40%;
      display: flex;
      justify-content: space-around;
      a {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
