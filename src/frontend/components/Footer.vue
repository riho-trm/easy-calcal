<template>
  <footer>
    <div class="copyright">
      <p>©️2022 CalcCalories</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: 70px;
  background-color: #39587d;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  .copyright {
    padding-right: 1.2rem;
    font-size: 1.3rem;
    color: white;
    align-self: center;
  }
}
</style>
