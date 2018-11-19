<template>
  <div id="container">
    <h1>Login</h1>

    <form class="login" @submit.prevent="fazerLogin">

      <input-box texto="E-mail" tipo="email" v-model="email" />
      <input-box texto="Senha" tipo="password" v-model="senha" />

      <error-box v-if="erros.length" :erros="erros" />

      <button type="submit" class="btn btn-primary entrar">Entrar</button>
    </form>

    <div class="row">
      <div class="centralizar-texto">
        <a href="/cadastrar-usuario">Criar meu cadastro</a>
      </div>
    </div>
    <div class="row">
      <div class="centralizar-texto">
        <a href="/esqueci-senha">Esqueci minha senha</a>
      </div>
    </div>

  </div>
</template>

<script>
import InputBox from './InputBox.vue'
import ErrorBox from './ErrorBox.vue'
import { mapActions } from 'vuex';

export default {
  components: {
    InputBox,
    ErrorBox
  },
  data() {
    return {
      email: '',
      senha: '',
      erros: []
    }
  },
  methods: {
    ...mapActions(['autenticar']),
    async fazerLogin() {
      const dados = { email: this.email, password: this.senha }

      try {
        if (!!dados.email && !!dados.password) {
          await this.autenticar(dados)
          this.$router.push('/')
        } else {
          this.erros = ['Campos não preenchidos']
        }
      } catch (err) {
        this.erros = err
      }
    },
  },
};
</script>

<style scoped>
#container {
  width: 320px;
  margin: 0 auto;
}

.erro {
  color: red;
}

.entrar {
  display: block;
  margin: 25px auto;
}

.centralizar-texto {
  text-align: center;
  width: 100%;
}
</style>
