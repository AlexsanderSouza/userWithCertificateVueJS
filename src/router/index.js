import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const guest = (to, from, next) => {
    if (!localStorage.getItem('authToken')) {
        return next()
    } else {
        return next('/Workarea')
    }
}

const auth = (to, from, next) => {
    if (localStorage.getItem('authToken')) {
        return next()
    } else {
        return next('/login')
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        beforeEnter: guest,
        component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
    },
    {
        path: '/workarea',
        name: 'Workarea',
        beforeEnter: auth,
        props: true,
        component: () => import(/* webpackChunkName: "workarea" */ '../views/Workarea.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
