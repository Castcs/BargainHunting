import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import store from './store'; // Import the Vuex store

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')

// const storedToken = localStorage.getItem('token')

// if (storedToken) {
//     this.$store.commit('setLoggedIn', true);
// }