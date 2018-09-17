import Vue from 'vue';
import Vuex from 'vuex';
import { NOME_STORAGE_AUTH } from './config.json'

Vue.use(Vuex);

function substituirErroGenerico(erros) {
  if (typeof erros === 'object' && erros.length) {
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
      const data = JSON.stringify(dados)
      const header = { "Content-Type" : "application/json", "Content-Length" : data.length.toString(), "Accept" : "application/json" };
      const res = await fetch('http://localhost:8181/user/login', { method: 'POST', body: data, headers : header, mode : 'cors' });

      if (!res.token) {
        throw substituirErroGenerico(res.erros)
      }

      window.localStorage.setItem(NOME_STORAGE_AUTH, res.token)
    },
    async criarUsuario(_, dados) {
      const data = JSON.stringify(dados)
      const header = { "Content-Type" : "application/json", "Content-Length" : data.length.toString(), "Accept" : "application/json" };
      const res = await fetch('http://localhost:8181/user/save', { method: 'POST', body: data, headers : header, mode : 'cors' });

      if (res.erros) {
        throw substituirErroGenerico(res.erros);
      }
    },
    deslogar() {
      window.localStorage.removeItem(NOME_STORAGE_AUTH);
    }
  },
});
