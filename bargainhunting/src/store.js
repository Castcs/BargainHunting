import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    // Add other state properties as needed
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    // Add other mutations as needed
  },
  actions: {
    // Add actions if needed
  },
  modules: {
    // You can modularize your store if needed
  },
});