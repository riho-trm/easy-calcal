<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  setup() {
    const created = async () => {
      const response = await axios.get(
        "https://app.rakuten.co.jp/services/api/Travel/HotelRanking/20170426?format=json&genre=all&applicationId=1099623613801578409"
      );
      console.dir(JSON.stringify(response));
    };
    created();
  },
});
</script>

<style></style>
