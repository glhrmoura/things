<template>
  <div class="task-list__container">
    <transition-group class="task-list" name="fade-list" tag="ul">
      <TaskItem
        :item="item"
        :key="item.id"
        v-for="item in list"
        @delete-task="openDeleteTaskModal"
      />
    </transition-group>

    <DeleteTaskModal
      :task="task"
      :name="componentId"
      :visible="deleteTaskModal"
      @delete="onDeleteTask"
      @cancel="deleteTaskModal = false"
    />
  </div>
</template>

<script>
import { genID } from '@/utils';

import TaskItem from './components/TaskItem';
import DeleteTaskModal from '@/components/Modals/DeleteTaskModal';

export default {
  components: {
    TaskItem,
    DeleteTaskModal,
  },
  data() {
    return {
      task: {},
      componentId: genID(),
      deleteTaskModal: false,
    };
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    openDeleteTaskModal(task) {
      this.task = task;
      this.deleteTaskModal = true;
    },

    onDeleteTask() {
      const payload = {
        task: this.task,
      };

      this.$store.dispatch('tasks/deleteTask', payload);
      this.deleteTaskModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-list-enter-active,
.fade-list-leave-active,
.fade-list-move {
  transition: 0.4s;
  transition-property: transform;
}

.fade-list-enter-to {
  opacity: 1;
}

.fade-list-leave-active {
  position: absolute;
  width: 100%;
}

.fade-list-leave-to {
  opacity: 0;
}

.task-list {
  position: relative;
  margin: 0px;
  padding: 0px;
  list-style: none;
}
</style>
