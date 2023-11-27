import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import store from './store'; // Import the Vuex store

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')

const storedToken = localStorage.getItem('jwt')
if (storedToken) {
    this.$store.commit('setToken', storedToken);
}