import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function substituirErroGenerico(erros) {
  if (erros && erros.length) {
    return erros;
  }

  if (typeof erros === 'string') {
    return [erros];
  }

  return ['Houve um erro desconhecido'];
}

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    async autenticar(_, dados) {
      const res = await fetch('www.api.com.br/user/login', { method: 'POST', data: dados });

      if (!res.token) {
        throw substituirErroGenerico(res.erros);
      }

      window.localStorage.setItem('auth-bolao', res.token);
    },
    async criarUsuario(_, dados) {
      const res = await fetch('www.api.com.br/user/save', { method: 'POST', data: dados });

      if (res.erros) {
        throw substituirErroGenerico(res.erros);
      }
    },
  },
});
