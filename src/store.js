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
  const body = JSON.stringify(dados || {})

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

  if (metodo === 'GET') {
    delete options.body
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

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }
    },
    async deslogar() {
      await request('/user/logout', { token: window.localStorage.getItem(NOME_STORAGE_AUTH) })
      window.localStorage.removeItem(NOME_STORAGE_AUTH);
    },
    async buscarClassificacaoTimes() {
      const res = await request('/classification/teams', {}, 'GET')

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }

      return res
    },
    async carregarDados() {
      const res = await request('/user/1', {}, 'GET')

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }

      return res
    },
    async atualizarUsuario(_, dados) {
      const res = await request('/user/save', dados)

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }
    },
  }
});
