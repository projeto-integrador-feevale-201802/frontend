<template>
  <div id="container">
    <h1>Cadastrar</h1>

    <form class="login" @submit.prevent="cadastrarUsuario">
      <input-box texto="E-mail" tipo="email" v-model="email" />
      <input-box texto="Nome" tipo="text" v-model="nome" />

      <error-box v-if="erros.length" :erros="erros" />

      <button type="submit" class="btn btn-primary cadastrar">Cadastrar</button>
    </form>

    <b-modal
      v-model="exibirModalSucesso"
      @hidden="$router.push('/login')"
      title="Sucesso"
      ok-only
    >
      Cadastro criado com sucesso
    </b-modal>
  </div>
</template>

<script>
import InputBox from './InputBox.vue'
import ErrorBox from './ErrorBox.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    InputBox,
    ErrorBox
  },
  data() {
    return {
      nome: '',
      email: '',
      erros: [],
      exibirModalSucesso: false
    }
  },
  methods: {
    ...mapActions([
      'criarUsuario'
    ]),
    cadastrarUsuario() {
      const dados = {
        name: this.nome,
        email: this.email
      }

      this.criarUsuario(dados)
        .then(() => {
          this.exibirModalSucesso = true
        })
        .catch(erros => {
          this.erros = erros
        })
    }
  }
}
</script>

<style>
#container {
  width: 320px;
  margin: 0 auto;
}

h1 {
  text-align: center;
}

.nome-avatar {
  margin: 0 10px;
}

.cadastrar {
  display: block;
  margin: 25px auto;
}
</style>
