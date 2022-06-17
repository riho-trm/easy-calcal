<template>
  <header>
    <div class="container">
      <div class="title">
        <img
          class="title-img"
          src="../assets/title_logo.png"
          alt="タイトルロゴ"
        />
        <router-link to="/">EASY CALCAL</router-link>
      </div>
      <div class="link">
        <router-link to="/calccalories">カロリー計算</router-link>
        <router-link to="/mydatalist">Myデータ</router-link>
        <router-link to="/mypage">マイページ</router-link>
        <router-link to="/adminmenu" v-if="isAdmin === 1"
          >管理者メニュー</router-link
        >
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
  position: sticky; /*固定する*/
  position: -webkit-sticky; /*Safari用ベンダープレフィックス*/
  top: 0;
  z-index: 9999;
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
      display: flex;
      img {
        height: 80px;
      }
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
