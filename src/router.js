import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import CadastrarUsuario from './views/CadastrarUsuario.vue';

Vue.use(Router);

function somenteAutenticado(to, from, next) {
  if (window.localStorage.getItem('auth-bolao')) {
    next();
  } else {
    next('/login');
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: somenteAutenticado,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/cadastrar-usuario',
      name: 'cadastrar usuario',
      component: CadastrarUsuario,
    },
  ],
});