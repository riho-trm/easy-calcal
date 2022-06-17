<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="description">
        <h1>404</h1>
        <p>Not Found</p>
        <p>お探しのページは見つかりません。</p>
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

<style lang="scss" scoped></style>
