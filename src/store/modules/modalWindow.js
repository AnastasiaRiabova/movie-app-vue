const modalWindow = {
  state: {
    showModal: false
  },
  getters: {
    showModal: ({ showModal }) => showModal
  },
  mutations: {
    TOGGLE_MODAL (state, bool) {
      state.showModal = bool
    }
  },
  actions: {
    toggleModal ({ commit }, bool) {
      commit('TOGGLE_MODAL', bool)
    }
  }
}

export default modalWindow
