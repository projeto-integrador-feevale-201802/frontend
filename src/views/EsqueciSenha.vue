<template>
  <div id="container">
    <h1>Esqueci minha senha</h1>

    <form class="login" @submit.prevent="recuperarSenha">

      <p>Informe seu e-mail para recuperar sua senha.</p>
      <input-box texto="E-mail" tipo="email" v-model="email" />

      <error-box v-if="erros.length" :erros="erros" />

      <button type="submit" class="btn btn-primary entrar">Recuperar</button>
    </form>

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
      erros: []
    }
  },
  methods: {
    ...mapActions(['recuperarLogin']),
    async recuperarSenha() {
      const dados = { email: this.email }

      try {
        if (!!dados.email) {
          await this.recuperarLogin(dados)
        } else {
          this.erros = ['E-mail não preenchido']
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
  width: 390px;
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
