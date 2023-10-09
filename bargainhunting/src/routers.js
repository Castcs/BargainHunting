// import { create } from 'core-js/core/object'
import HomeComponent from './components/HomeComponent.vue'
import SignUp from './components/SignUp.vue'
import LoginPage from './components/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'SignUp',
        component: SignUp,
        path: '/',
    },
    {
        name: 'HomeComponent',
        component: HomeComponent,
        path: '/home',
    },
    {
        name: 'LoginPage',
        component: LoginPage,
        path: '/log-in'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router