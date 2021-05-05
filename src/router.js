import  Vue from 'vue'
import Router from 'vue-router'
import Weather from "./components/Weather";
import Login from "./components/Login";
import Register from "./components/Register";
Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {path:'/',component:Weather},
        {path: '/login',component: Login},
        {path: '/Register',component: Register}
        ]
})