import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Register from '../components/Register'
import Login from '../components/Login'
import UserMap from '../components/UserMap'
import UserChat from '../components/UserChat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/map',
      name: 'UserMap',
      component: UserMap
    },
    {
      path: '/chat',
      name: 'UserChat',
      component: UserChat
    }
  ]
})
