import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    email: "",
    searchQuery: "",
    jwt: null,
    // Add other state properties as needed
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setEmail(state, value) {
      state.email = value;
    },
    setSearchQuery(state, value) {
      state.searchQuery = value;
    },
    setJwt(state, token) {
      state.jwt = token;
      localStorage.setItem('jwt', token);
    }
    // Add other mutations as needed
  },
  actions: {
    // Add actions if needed
  },
  modules: {
    // You can modularize your store if needed
  },
});