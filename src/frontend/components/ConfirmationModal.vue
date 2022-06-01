<template>
  <teleport to="body">
    <div class="modal" id="cancel-modal" v-show="isVisible"></div>
    <div class="modal-content" v-show="isVisible">
      <div class="message">
        {{ message }}
      </div>
      <div class="button">
        <AppCancelButton
          class="cancel-btn"
          buttonText="いいえ"
          @cancel="cancel"
        />
        <AppProcessingButton
          class="process-btn"
          buttonText="はい"
          @processing="processing"
        />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppProcessingButton from "@/components/container/AppProcessingButton.vue";
import AppCancelButton from "@/components/container/AppCancelButton.vue";

export default defineComponent({
  components: {
    AppProcessingButton,
    AppCancelButton,
  },
  props: {
    isVisible: {
      required: true,
      type: Boolean,
      default: false,
    },
    message: {
      required: true,
      type: String,
    },
  },
  emits: ["cancel", "processing"],
  setup(props, context) {
    const cancel = () => {
      context.emit("cancel");
    };
    const processing = () => {
      context.emit("processing");
    };
    return {
      cancel,
      processing,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-content {
  font-family: "Kiwi Maru", serif;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // モーダルの幅や色などはお好きにどうぞ！
  background-color: white;
  width: 600px;
  height: auto;
  padding: 20px;
  .message {
    font-size: 1.5rem;
  }
  .button {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    padding: 2rem 0;
    :deep(.btn) {
      font-size: 1.5rem;
      padding: 0.5rem 2rem;
      margin: 0 1rem;
    }
    .process-btn {
      :deep(.btn--color) {
        background-color: red;
        border: 2px solid red;
        &:hover {
          color: red;
          background: #fff;
        }
      }
    }
  }
}
</style>
