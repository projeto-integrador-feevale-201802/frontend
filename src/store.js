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

function getToken() {
  return window.localStorage.getItem(NOME_STORAGE_AUTH)
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
      request('/user/logout', { token: window.localStorage.getItem(NOME_STORAGE_AUTH) })
      window.localStorage.removeItem(NOME_STORAGE_AUTH);
    },
    async buscarClassificacaoTimes() {
      const res = await request('/classification/teams', {}, 'GET')

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }

      return res
    },
    async carregarDadosUsuario() {
      const res = await request('/user/' + getToken(), {}, 'GET')

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
    async buscarClassificacaoUsuarios() {
      const res = await request('/classification/users', {}, 'GET')

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }

      return res
    },
    async buscarUsuarios() {
      const res = await request('/user', {}, 'GET')

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }

      return res
    },
    async buscarApostas(_, {usuario, rodada}) {
      const res = await request('/bet/' + usuario + '/' + rodada, {}, 'GET')

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }

      return res
    },
    async salvarApostas(_, dados) {
      const { id, errors } = await request('/user/' + getToken(), {}, 'GET')

      if (errors) {
        throw substituirErroGenerico(errors);
      }

      for (const aposta of dados) {
        aposta.idUser = id
      }

      const res = await request('/bet/save', dados)

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }
    },
    async buscarViewApostas(_, {rodadaSelecionada, usuarioSelecionado}) {
      if (usuarioSelecionado === undefined) {
        const { id, errors } = await request('/user/' + getToken(), {}, 'GET')

        if (errors) {
          throw substituirErroGenerico(errors);
        }

        usuarioSelecionado = id
      }

      const res = await request('/bet/' + usuarioSelecionado + '/' + rodadaSelecionada, {}, 'GET')

      if (res.errors) {
        throw substituirErroGenerico(res.errors)
      }

      return res
    },
    async buscarJogos(_, round) {
      const res = await request('/game/' + round, {}, 'GET')


      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }

      return res
    },
    async buscarNovasRodadas() {
      const res = await request('/game/rounds', {}, 'GET')

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }

      return res
    },
    async buscarRodadasEncerradas() {
      const res = await request('/game/finishedRounds', {}, 'GET')

      if (res.errors) {
        throw substituirErroGenerico(res.errors);
      }

      return res
    },
    async recuperarLogin(_, dados) {
      const res = await request('/user/start-password-recovery', dados)

      if (res.errors) {
        throw substituirErroGenerico(res.errors)
      }

      return res
    },
    async alterarSenha(_, dados) {
      const res = await request('/user/change-password', dados)

      if (res.errors) {
        throw substituirErroGenerico(res.errors)
      }

      return res
    },
  }
});
