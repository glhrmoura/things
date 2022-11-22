<template>
  <BaseModal :name="name" :visible="visible" @before-close="$emit('cancel')">
    <div class="delete-task-modal">
      <h5 class="delete-task-modal__title">
        Tem certeza que deseja excluir essa tarefa?
      </h5>

      <div class="delete-task-modal__task-text__container">
        <p class="delete-task-modal__task-text">
          {{ task.text }}
        </p>
      </div>

      <div class="delete-task-modal__options">
        <button
          aria-label="Trigger action to delete a task"
          class="btn btn-primary btn-block"
          @click="$emit('delete')"
        >
          Sim
        </button>

        <button
          aria-label="Cancels the action of deleting a task"
          class="btn btn-outline-primary btn-block"
          @click="$emit('cancel')"
        >
          Não
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/Modals/BaseModal';

export default {
  components: {
    BaseModal,
  },

  props: {
    name: String,

    visible: Boolean,

    task: Object,
  },
};
</script>

<style scoped lang="scss">
.delete-task-modal {
  padding: 20px;
}

.delete-task-modal__title {
  font-weight: 400;
  font-size: 20px;
  margin-top: 0px;
  margin-bottom: 20px;
}

.delete-task-modal__task-text__container {
  max-height: 300px;
  overflow: auto;
  padding: 0px 20px;
  overscroll-behavior: contain;
}

.delete-task-modal__task-text {
  position: relative;
  font-weight: 300;
  font-size: 18px;
  margin: 0px;
  color: $mutedTextColor;
}

.delete-task-modal__options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  margin: 20px 0px 0px;
}
</style>
