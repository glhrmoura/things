<template>
  <div @keydown.prevent.ctrl.83="addTask" @keydown.enter="addTask" class="task-form">
    <InputState :state="task.state" @updated-state="onStateChange" />
    <InputText v-model="task.text" @focus="onFocus" :placeholder="placeholder" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { TASK_LIST_STATES } from '@/constants/tasks.js';

import InputText from '@/components/Form/InputText';
import InputState from '@/components/Form/InputState';

export default {
  components: {
    InputText,
    InputState,
  },
  data() {
    return {
      task: { text: '', state: '' },
      placeholders: {
        [TASK_LIST_STATES.EMPTY]: 'Um passo de cada vez',
        [TASK_LIST_STATES.PENDING]: 'Cuidado com o Burnout, viu?!',
        [TASK_LIST_STATES.FINISHED]: 'Pera, tem mais uma coisa',
      },
    };
  },
  methods: {
    addTask() {
      if (!this.task.text) return;

      const payload = {
        task: {
          ...this.task,
          state: 'pending',
        },
      };

      this.$store.dispatch('tasks/addTask', payload);
      this.task = { text: '', state: '' };
    },
    onStateChange(state) {
      this.task = { ...this.task, state };
    },
    onFocus() {
      this.$store.dispatch('tasks/setEditTask', null);
    },
  },
  computed: {
    ...mapGetters({
      taskListState: 'tasks/taskListState',
    }),
    placeholder() {
      return this.placeholders[this.taskListState];
    },
  },
};
</script>

<style lang="scss" scoped>
.task-form {
  display: flex;
  margin-top: 20px;
}
</style>
