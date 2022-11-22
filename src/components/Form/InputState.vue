<template>
  <button
    class="input-state"
    @click="onClick"
    :class="styleClass"
    aria-label="Changes the status of a task"
  >
    <img
      width="28px"
      height="28px"
      alt="Check icon"
      class="input-state__check-icon"
    />
  </button>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      initialState: this.state,
    };
  },

  props: {
    state: {
      type: String,
      default: '',
    },
  },

  methods: {
    onClick() {
      if (this.checked || this.isReadOnly) return;

      this.checked = true;

      const updateState = () => {
        this.checked = false;
        this.$emit('updated-state', this.nextState);
      };

      this.nextState !== 'finished' ? updateState() : setTimeout(updateState, 500);
    },
  },

  computed: {
    isReadOnly() {
      return !this.state;
    },

    nextState() {
      const initialStateIsFinished = this.initialState === 'finished';
      const targetState = initialStateIsFinished ? 'pending' : 'finished';

      return this.initialState === this.state ? targetState : this.initialState;
    },

    nextStateEqualInitialState() {
      return this.nextState === this.initialState;
    },

    styleClass() {
      return {
        [`input-state--${this.state}`]: true,
        'input-state--checked': this.checked,
        'input-state--read-only': this.isReadOnly,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.input-state {
  appearance: none !important;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border: 1px solid $mutedBorderColor;
  border-radius: 100%;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  cursor: pointer;
  background-color: inherit;

  &--pending {
    border-color: $primaryBorderColor;
  }

  &--read-only {
    cursor: default;
  }

  &--finished {
    border-color: $primaryColor;

    .input-state__check-icon {
      display: inline-block;
      content: url('../../assets/icons/check-blue.png');
    }
  }

  &--checked {
    transition: all 0.1s;
    border-color: $primaryColor;
    animation: bg-fill 0.1s linear forwards;

    .input-state__check-icon {
      display: inline-block;
      transform: scale(0);
      content: url('../../assets/icons/check-white.png');
      animation: scale 0.15s linear forwards;
      animation-delay: 0.1s;
    }

    @keyframes scale {
      0% {
        transform: scale(0);
      }

      50% {
        transform: scale(1.5);
      }

      100% {
        transform: scale(1);
      }
    }

    @keyframes bg-fill {
      0% {
        box-shadow: 0px 0px 0px 0px $primaryColor inset;
      }

      100% {
        box-shadow: 0px 0px 0px 15px $primaryColor inset;
      }
    }
  }
}

.input-state__check-icon {
  position: absolute;
  display: none;
  width: 10px;
  height: 10px;
  object-fit: contain;
}
</style>
