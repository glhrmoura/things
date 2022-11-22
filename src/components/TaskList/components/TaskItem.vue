<template>
  <li class="task-item" :class="{ [`task-item--${task.state}`]: true }">
    <div class="task-item__content">
      <InputState
        :state="task.state"
        @updated-state="onUpdatedTaskState"
      />

      <template v-if="readMode">
        <p class="task-item__text">
          {{ task.text }}
        </p>

        <TaskActions
          :visible="isPending"
          @edit-mode="readMode = false"
          @delete-task="$emit('delete-task', task)"
        />
      </template>

      <template v-else-if="isPending">
        <InputText
          :autofocus="true"
          v-model="task.text"
          @keydown.esc="onEscPress"
          @keydown.enter="onUpdateTask"
          @keydown.prevent.ctrl.83="onUpdateTask"
        />
      </template>
    </div>
  </li>
</template>

<script>
import { genID } from '@/utils';
import { mapGetters } from 'vuex';

import InputText from '@/components/Form/InputText';
import InputState from '@/components/Form/InputState';
import TaskActions from '@/components/TaskList/components/TaskActions';

export default {
  components: {
    InputText,
    InputState,
    TaskActions,
  },

  data() {
    return {
      readMode: true,
      oldTaskText: '',
      componentId: genID(),
      task: { ...this.item },
    };
  },

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    'task.state'() {
      this.readMode = true;
    },

    readMode(val) {
      if (val) return;

      this.oldTaskText = this.task.text;
      this.$store.dispatch('tasks/setEditTask', this.componentId);
    },

    editTask(fieldId) {
      if (fieldId === this.componentId) return;

      this.readMode = true;
    },
  },

  methods: {
    onEscPress() {
      this.task.text = this.oldTaskText;
      this.readMode = true;
    },

    onUpdatedTaskState(state) {
      const payload = {
        updated: true,
        task: {
          ...this.task,
          state,
        },
      };

      this.$store.dispatch('tasks/updateTask', payload);
    },

    onUpdateTask() {
      if (!this.task.text) return;

      const payload = {
        task: this.task,
      };

      this.$store.dispatch('tasks/updateTask', payload);
      this.readMode = true;
    },
  },

  computed: {
    ...mapGetters({
      editTask: 'tasks/editTask',
    }),

    isPending() {
      return this.task.state === 'pending';
    },

    isFinished() {
      return this.task.state === 'finished';
    },
  },
};
</script>

<style lang="scss" scoped>
.task-item {
  position: relative;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &--finished {
    .task-item__text {
      text-decoration: line-through;
    }
  }
}

.task-item__content {
  position: relative;
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  height: 30px;
  width: 100px;
}

.task-item__text {
  flex: 1;
  font-size: 16px;
  margin: 0px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1px;
}
</style>
