import Vue from 'vue'
import Vuex from 'vuex'
import movies from './modules/movies'
import loader from './modules/loader'
import modalWindow from './modules/modalWindow'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { movies, loader, modalWindow }
})
