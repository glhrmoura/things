<template>
  <Modal
    :name="name"
    @opened="$emit('opened')"
    @closed="$emit('closed')"
    @before-open="$emit('before-open')"
    @before-close="$emit('before-close')"
  >
    <slot />
  </Modal>
</template>

<script>
export default {
  props: {
    name: String,

    visible: Boolean,
  },

  watch: {
    visible(newVal) {
      newVal ? this.show() : this.hide();
    },
  },

  methods: {
    show() {
      this.$modal.show(this.name);
    },

    hide() {
      this.$modal.hide(this.name);
    },
  },
};
</script>

<style lang="scss">
.vm--container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;
}

.vm--overlay {
  opacity: 0.5 !important;
  background: $darkBgColor !important;
}

.vm--modal {
  border-radius: 4px !important;
  overflow: auto !important;
  height: auto !important;
  width: 500px !important;
  top: 0px !important;
  left: 0px !important;

  @media (max-width: 768px) {
    width: 100% !important;
    height: auto !important;
    max-height: 90vh !important;
  }
}
</style>
