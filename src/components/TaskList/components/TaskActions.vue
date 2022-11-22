<template>
  <ul v-if="visible" class="task_actions">
    <li @click="$emit('delete-task')" class="task-action-container">
      <button aria-label="Triggers a task's deletion event" class="task-action">
        <img
          width="100%"
          height="100%"
          alt="X-shaped icon"
          class="task-action__icon"
          :src="require('@/assets/icons/close-blue@2x.png')"
        />
      </button>
    </li>

    <li @click="$emit('edit-mode')" class="task-action-container">
      <button aria-label="Starts editing a task" class="task-action">
        <img
          width="100%"
          height="100%"
          alt="Pen icon"
          class="task-action__icon"
          :src="require('@/assets/icons/edit-blue@2x.png')"
          aria-label="Cancels the action of deleting a task"
        />
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    visible: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.task_actions {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0px;
  margin: 0px;
  margin-left: 4px;
}

.task-action-container {
  &:not(:last-child) {
    margin-right: 8px;
  }
}

.task-action {
  position: relative;
  display: flex;
  width: 18px;
  height: 18px;
  padding: 4px;
  border: 1px solid $primaryColor;
  border-radius: 50%;
  cursor: pointer;
  background-color: inherit;
}

.task-action__icon {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
