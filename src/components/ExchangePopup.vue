<template>
  <div class="backdrop" v-if="isOpen" @click="close">
    <div class="popup" @click.stop>
      <slot name="date"></slot>
      <hr />
      <slot name="currency"></slot>
      <hr />
      <slot name="actions" :confirm="confirm"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExchangePopup",

  popupController: null,

  data() {
    return {
      isOpen: false,
    };
  },

  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.addEventListener("keydown", this.handleKeydown);
  },

  methods: {
    open() {
      let resolve;
      let reject;
      const popupPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });
      this.isOpen = true;
      this.$options.popupController = { resolve, reject };

      return popupPromise;
    },

    confirm() {
      this.$options.popupController.resolve(true);
      this.isOpen = false;
    },

    close() {
      this.$options.popupController.resolve(false);
      this.isOpen = false;
    },

    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.close();
      }
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  min-height: 280px;
  padding: 10px;
  background-color: whitesmoke;
  border-radius: 5px;
}
</style>
