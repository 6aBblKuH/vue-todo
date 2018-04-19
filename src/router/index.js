import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import WelcomePage from '@/components/WelcomePage'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/welcome',
      name: 'WelcomePage',
      component: WelcomePage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
