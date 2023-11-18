// import { create } from 'core-js/core/object'
import HomeComponent from './components/HomeComponent.vue'
import SignUp from './components/SignUp.vue'
import LoginPage from './components/LoginPage.vue'
import LandingPage from './components/LandingPage.vue'
import SearchResult from './components/SearchResult.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'LandingPage',
        component: LandingPage,
        path: '/',
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up',
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
    },
    {
        name: 'SearchResult',
        component: SearchResult,
        path: '/search-result'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router