import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/rights/Rights';
import Roles from '@/views/rights/Roles';

// 导入message
import { Message } from 'element-ui';
Vue.use(Router)

const router = new Router({
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
});
/// 路由的全局前置守卫 （拦截器）  -- 路由跳转之前执行
router.beforeEach((to, from, next) => {
     console.log(to);
  // console.log(from);
  // next();
  // 如果是登录的时候不判断token ，不是登录才判断token
  // console.log(to);
   console.log(to.name);
  if (to.name && to.name.toLocaleLowerCase() !== 'login') {
    // 判断token
   
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 没有token,跳转到登录页面
      // this.$router.push('/login')
      router.push('/login');
       // 提示
      // this.$message.warning('请先登录');
      Message.warning('请先登录');
      Message.warning('请先登录');
      return;
    }
  }
  next();
});

export default router;