import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

const Store = new Vuex.Store({
  modules,
});

Store.dispatch('tasks/init');

export default Store;
