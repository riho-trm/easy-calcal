<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="description">
        <h1>404</h1>
        <p class="not-found">Not Found</p>
        <p class="not-found-descriprion">お探しのページは見つかりません。</p>
        <AppRoutingButton
          class="return-top-btn"
          buttonText="TOPへ戻る"
          routing=""
        />
      </div>
      <div class="img">
        <img
          class="title-img"
          src="../assets/404_syazai.png"
          alt="謝罪する男女"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AppRoutingButton from "@/components/container/AppRoutingButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AppRoutingButton },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.top-wrapper {
  .container {
    width: 70%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    min-height: 80vh;
    .description {
      width: 50%;
      h1 {
        font-size: 4rem;
      }
      p {
        font-size: 1rem;
        font-weight: 700;
      }
      .not-found-descriprion {
        padding: 1.5rem 0;
      }
      :deep(.btn) {
        font-size: 1rem;
        padding: 0.5rem 1rem;
        margin: 0;
      }
    }
    .img {
      width: 50%;
      .title-img {
        width: 60%;
      }
    }
  }
}
</style>
