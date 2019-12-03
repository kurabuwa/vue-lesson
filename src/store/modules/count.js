const state = {
  count: 0,
}

const actions = {
  incrementCount({ commit }) {
    commit('incrementCount');
  }
}

const mutations = {
  incrementCount(state) {
    state.count++;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}