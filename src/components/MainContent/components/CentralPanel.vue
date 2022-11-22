<template>
  <div class="central-panel">
    <CentralPanelLoading v-if="loadingTasks" />
    <template v-else>
      <h1 v-show="primaryTitle" class="central-panel__title">
        {{ primaryTitle }}
      </h1>
      <div v-if="illustration" class="central-panel__state-illustration">
        <ImageSource
          :image="illustration"
          class="central-panel__state-illustration__image-source"
        />
      </div>
      <div class="central-panel__taks-group">
        <h2 class="central-panel__taks-group__title">
          {{ taskListTitle }}
          <span v-if="pendingTasksCount"> ({{ pendingTasksCount }}) </span>
        </h2>
        <TaskList :list="pendingByLastUpdateTopDown" />
        <CreateTask />
      </div>
      <div v-show="finishedTasksCount" class="central-panel__taks-group">
        <h2 class="central-panel__taks-group__title">Feito ({{ finishedTasksCount }})</h2>
        <TaskList :list="finishedByLastUpdateBottomUp" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { TASK_LIST_STATES } from '@/constants/tasks.js';

import TaskList from '@/components/TaskList/Main';
import CentralPanelLoading from '@/components/MainContent/components/CentralPanelLoading.vue';
import CreateTask from '@/components/MainContent/components/CreateTask';

export default {
  components: {
    TaskList,
    CreateTask,
    CentralPanelLoading,
  },
  data() {
    return {
      primaryTitles: {
        [TASK_LIST_STATES.EMPTY]: 'Nenhuma tarefa criada ainda.',
        [TASK_LIST_STATES.FINISHED]: 'Tudo pronto!',
      },
      taskListTitles: {
        [TASK_LIST_STATES.EMPTY]: 'Que tal organizar as ideias criando uma lista agora?',
        [TASK_LIST_STATES.PENDING]: 'Pendente',
        [TASK_LIST_STATES.FINISHED]: 'Sensação de dever cumprido. Que tal um café agora?',
      },
      illustrations: {
        [TASK_LIST_STATES.EMPTY]: {
          src: require('@/assets/images/empty.png'),
          alt: 'Illustration of a woman in meditation position',
          sources: [
            {
              type: 'image/jpeg',
              srcset: require('@/assets/images/empty@2x.png'),
              media: '(min-width: 768px)',
            },
            {
              type: 'image/jpeg',
              srcset: require('@/assets/images/empty.png'),
              media: '(min-width: 0px)',
            },
          ],
        },
        [TASK_LIST_STATES.FINISHED]: {
          src: require('@/assets/images/done.png'),
          alt: 'Illustration of a man holding a giant coffee cup',
          sources: [
            {
              type: 'image/jpeg',
              srcset: require('@/assets/images/done@2x.png'),
              media: '(min-width: 768px)',
            },
            {
              type: 'image/jpeg',
              srcset: require('@/assets/images/done.png'),
              media: '(min-width: 0px)',
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      pendingTasks: 'tasks/pendingTasks',
      finishedTasks: 'tasks/finishedTasks',
      loadingTasks: 'tasks/loadingTasks',
      taskListState: 'tasks/taskListState',
    }),
    finishedTasksCount() {
      return this.finishedTasks.length;
    },
    pendingTasksCount() {
      return this.pendingTasks.length;
    },
    primaryTitle() {
      return this.primaryTitles[this.taskListState];
    },
    taskListTitle() {
      return this.taskListTitles[this.taskListState];
    },
    illustration() {
      return this.illustrations[this.taskListState];
    },
    pendingByLastUpdateTopDown() {
      const taskList = [...this.pendingTasks];

      return taskList.sort((a, b) => {
        return a.updatedAt - b.updatedAt;
      });
    },
    finishedByLastUpdateBottomUp() {
      const taskList = [...this.finishedTasks];

      return taskList.sort((a, b) => {
        return b.updatedAt - a.updatedAt;
      });
    },
  },
};
</script>

<style lang="scss">
.central-panel__state-illustration__image-source {
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>

<style scoped lang="scss">
.central-panel {
  width: 100%;
  background-color: $primaryBgColor;
  border-radius: 12px;
  padding: 30px 28px 28px;
  box-shadow: 0 1px 6px 0 $primaryBoxShadowColor;
}

.central-panel__title {
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  font-weight: 400;
  margin: 0px 0px 30px 0px;
}

.central-panel__state-illustration {
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  margin: 0px 0px 48px 0px;
  max-height: 186px;
}

.app__main-container__pyramid-img {
  display: flex;
  align-items: flex-start;
  grid-area: 2 / 1 / 3 / 2;
  margin-top: 20px;
  margin-right: 20px;
}

.app__main-container__plant-img {
  display: flex;
  align-items: flex-end;
  grid-area: 4 / 3 / 5 / 4;
  margin-left: 20px;
}

.central-panel__taks-group {
  margin-bottom: 30px;
}

.central-panel__taks-group__title {
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  margin: 0px 0px 20px 0px;
}
</style>