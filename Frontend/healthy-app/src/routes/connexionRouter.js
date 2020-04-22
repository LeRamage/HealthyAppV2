import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const connexionRoute = new Router({
    mode:"history",
    routes: [
        {
            path:'/',
            alias:'/connexion',
            name:'connexion',
            component: () => import('../components/Connexion')
        },
        {
            path:'/home',
            name:'home',
            component: () => import("../components/Home")
        },
        {
            path:'/signup',
            name:'signup',
            component: () => import("../components/Signup")
        }
    ]
})

export default connexionRoute