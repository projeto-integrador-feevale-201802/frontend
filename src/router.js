import Vue from 'vue';
import Router from 'vue-router';
import { NOME_STORAGE_AUTH } from './config.json'
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import CadastrarUsuario from './views/CadastrarUsuario.vue';
import EsqueciSenha from './views/EsqueciSenha.vue';
import Senha from './views/Senha.vue';
import Perfil from './views/Perfil.vue';
import VerApostas from './views/VerApostas.vue';
import Apostar from './views/Apostar.vue';
import Ranking from './views/Ranking.vue';

Vue.use(Router);

function somenteAutenticado(to, from, next) {
  if (window.localStorage.getItem(NOME_STORAGE_AUTH)) {
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
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        esconderMenu: true
      },
    },
    {
      path: '/cadastrar-usuario',
      name: 'cadastrar usuario',
      component: CadastrarUsuario,
      meta: {
        esconderMenu: true
      },
    },
    {
      path: '/esqueci-senha',
      name: 'esqueci senha',
      component: EsqueciSenha,
      meta: {
        esconderMenu: true
      },
    },
    {
      path: '/senha/:token',
      name: 'senha',
      component: Senha,
      meta: {
        esconderMenu: true
      },
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: somenteAutenticado,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil,
      beforeEnter: somenteAutenticado,
    },
    {
      path: '/ver-apostas',
      name: 'ver-apostas',
      component: VerApostas,
      beforeEnter: somenteAutenticado,
    },
    {
      path: '/apostar',
      name: 'apostar',
      component: Apostar,
      beforeEnter: somenteAutenticado,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
      beforeEnter: somenteAutenticado,
    },
    {
      path: "*",
      redirect: '/'
    }
  ],
});
