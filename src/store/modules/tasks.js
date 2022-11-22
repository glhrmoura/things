import firebase from '@/services/firebase';

import { genID } from '@/utils';
import { TASK_LIST_STATES } from '@/constants/tasks.js';

export default {
  namespaced: true,

  state: {
    tasks: [],
    editTask: null,
    loadingTasks: false
  },

  getters: {
    tasks(state) {
      return state.tasks;
    },

    editTask(state) {
      return state.editTask;
    },

    loadingTasks(state) {
      return state.loadingTasks;
    },

    pendingTasks(state) {
      return state.tasks.filter(task => task.state === 'pending');
    },

    finishedTasks(state) {
      return state.tasks.filter(task => task.state === 'finished');
    },

    taskListState(state) {
      const { tasks } = state;
      const emptyTaskList = !tasks.length;
      const somePendingTask = tasks.some(task => task.state === 'pending');

      if (emptyTaskList) {
        return TASK_LIST_STATES.EMPTY;
      } else if (somePendingTask) {
        return TASK_LIST_STATES.PENDING;
      }

      return TASK_LIST_STATES.FINISHED;
    }
  },

  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },

    SET_EDIT_TASK(state, newEditTask) {
      state.editTask = newEditTask;
    },

    SET_LOADING_TASKS(state, isLoading) {
      state.loadingTasks = isLoading;
    },

    ADD_TASK(state, newTask) {
      const taskAlreadyExists = state.tasks.some(task => newTask.id === task.id);

      if (taskAlreadyExists) {
        return;
      }

      state.tasks.push(newTask);
    },

    UPDATE_TASK(state, newTask) {
      const taskIndex = state.tasks.findIndex(task => newTask.id === task.id);

      if (taskIndex === -1) {
        return;
      }

      state.tasks.splice(taskIndex, 1, newTask);
    },

    DELETE_TASK(state, deletedTask) {
      const taskIndex = state.tasks.findIndex(task => deletedTask.id === task.id);

      if (taskIndex === -1) {
        return;
      }

      state.tasks.splice(taskIndex, 1);
    }
  },

  actions: {
    setEditTask({ commit }, newEditTask) {
      commit('SET_EDIT_TASK', newEditTask);
    },

    addTask(_, payload) {
      const { task } = payload;
      const date = Date.now();
      const newTask = {
        id: genID(),
        text: task.text,
        state: task.state,
        createdAt: date,
        updatedAt: date
      };

      return firebase.db.userRef.child('tasks').push(newTask);
    },

    updateTask(_, payload) {
      const {
        updated = false,
        task: { key, ...task }
      } = payload;

      if (updated) {
        task.updatedAt = Date.now();
      }

      return firebase.db.userRef
        .child('tasks')
        .child(key)
        .set(task);
    },

    deleteTask(_, payload) {
      const { task } = payload;

      return firebase.db.userRef
        .child('tasks')
        .child(task.key)
        .remove();
    },

    async init({ commit }) {
      const snapToTask = snap => ({
        key: snap.key,
        ...snap.val()
      });

      /*
       * Listeners being registered to handle any action that happens in the database,
       * regarding the addition, update or removal of any task
       */
      const attachListenersToReference = ref => {
        ref.child('tasks').on('child_added', snap => {
          commit('ADD_TASK', snapToTask(snap));
        });

        ref.child('tasks').on('child_changed', snap => {
          commit('UPDATE_TASK', snapToTask(snap));
        });

        ref.child('tasks').on('child_removed', snap => {
          commit('DELETE_TASK', snapToTask(snap));
        });
      };

      /*
       * Listening to the reference change event for the user in the firebase database
       */
      firebase.db.addEventListener('user-ref-changed', ({ detail }) => {
        const { newUserRef } = detail;

        attachListenersToReference(newUserRef);
      });

      /*
       * First search for all tasks registered for the current user
       */
      try {
        commit('SET_LOADING_TASKS', true);

        const snap = await firebase.db.userRef.child('tasks').get();
        const tasks = Object.entries(snap.val() || {}).map(([key, value]) => ({
          key,
          ...value
        }));

        commit('SET_TASKS', tasks);
      } finally {
        commit('SET_LOADING_TASKS', false);
      }

      attachListenersToReference(firebase.db.userRef);
    }
  }
};
