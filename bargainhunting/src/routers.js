// import { create } from 'core-js/core/object'
import HomeComponent from './components/HomeComponent.vue'
import SignUp from './components/SignUp.vue'
import LoginPage from './components/LoginPage.vue'
import LandingPage from './components/LandingPage.vue'
import SearchResults from './components/SearchResults.vue'
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
        name: 'SearchResults',
        component: SearchResults,
        path: '/SearchResults'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router