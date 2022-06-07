import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * In case the project had been larger
 *
 * The store could be separated into modules
 * Have a file for the state, getters, mutations, actions
 */

export default new Vuex.Store({
  state: {
    projects: []
  },
  getters: {
    projects(state){
        return state.projects;
    }
},
  mutations: {
    ADD_PROJECT(state, payload) {
      state.projects = [...state.projects, payload];
    }
  },
  actions: {
    addProject({ commit }, payload) {
      commit('ADD_PROJECT', payload);
    },
  },
})
