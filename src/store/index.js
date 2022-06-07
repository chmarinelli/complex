import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
