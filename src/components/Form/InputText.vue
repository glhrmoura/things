<template>
  <div class="input-text__container">
    <span v-if="focused" class="input-text__enter">
			Enter ↵
		</span>

    <input
      type="text"
      ref="rootElement"
      class="input-text"
      :id="id"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="focused = false"
      @keydown="$emit('keydown', $event)"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      focused: false,
    };
  },

  mounted() {
    this.$refs.rootElement.focus();
  },

  props: {
    name: String,

    id: String,

    value: String,

    placeholder: String,
  },

  methods: {
    onFocus() {
      this.$emit('focus');

      this.focused = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-text__container {
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
}

.input-text {
  flex: 1;
  border: none;
  height: 30px;
  width: 100%;
  border-bottom: 1px solid $mutedBorderColor;
  outline: none;
  padding: 4px 0px;
  font-size: 16px;
  background-color: inherit;

  &::placeholder {
    color: $mutedTextColor;
  }

  &:focus {
    border-color: $primaryColor;
    padding: 4px 48px 4px 0px;
  }
}

.input-text__enter {
  position: absolute;
  right: 0px;
  background-color: $lightGreyBgColor;
  border-radius: 4px;
  padding: 2px 4px;
  color: $mutedTextColor;
  font-size: 10px;
  text-align: center;
}
</style>
