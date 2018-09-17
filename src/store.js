import Vue from 'vue';
import Vuex from 'vuex';
import { NOME_STORAGE_AUTH } from './config.json'

Vue.use(Vuex);

function substituirErroGenerico(erros) {
  if (typeof erros === 'object' && erros.length) {
    return erros
  }

  if (typeof erros === 'string') {
    return [erros]
  }

  return ['Houve um erro desconhecido']
}

function request(endpoint, dados, metodo='POST') {
  const body = JSON.stringify(dados)

  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': body.length,
    'Accept': 'application/json'
  }

  const options = {
    headers,
    body,
    method: metodo,
    mode: 'cors'
  }

  return fetch('http://localhost:8181' + endpoint, options).then(res => res.json())
}

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    async autenticar(_, dados) {
      const res = await request('/user/login', dados)

      if (!res.token) {
        throw substituirErroGenerico(res.errors)
      }

      window.localStorage.setItem(NOME_STORAGE_AUTH, res.token)
    },
    async criarUsuario(_, dados) {
      const res = await request('/user/save', dados)

      if (res.erros) {
        throw substituirErroGenerico(res.erros);
      }
    },
    deslogar() {
      window.localStorage.removeItem(NOME_STORAGE_AUTH);
    }
  },
});
