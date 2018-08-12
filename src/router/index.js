import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/rights/Rights';
import Roles from '@/views/rights/Roles';

Vue.use(Router)

export default new Router({
  routes: [
//  { name: 'Home', path: '/', component: Home },
//  { name: 'Login', path: '/login', component: Login }
		
		{ name: 'Login', path: '/login', component: Login },
		 {
      name: 'Home',
      path: '/',
      component: Home,
      children: [
        { name: 'users', path: '/users', component: Users },
        { name: 'rights', path: '/rights', component: Rights },
        { name: 'roles', path: '/roles', component: Roles }
      ]
    }
  ]
})
