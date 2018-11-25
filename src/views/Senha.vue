<template>
  <div id="container">
    <h1>Cadastro de Senha</h1>

    <form class="login" @submit.prevent="novaSenha">

      <p>Cadastre sua nova senha.</p>
      <input-box texto="Senha" tipo="password" v-model="dados.novasenha" placeholder="Digite sua nova senha" />
      <input-box texto="Confirmar Senha" tipo="password" v-model="dados.confsenha" placeholder="Digite para confirmar senha" />

      <error-box v-if="erros.length" :erros="erros" />

      <button type="submit" class="btn btn-primary entrar">Cadastrar</button>
    </form>

    <b-modal
      v-model="exibirModalSucesso"
      @hidden="$router.push('/login')"
      title="Sucesso"
      ok-only>
      Senha cadastrada com sucesso.
    </b-modal>

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
      erros: [],
      exibirModalSucesso: false,
      dados: {
        token: this.$route.params.token,
        novasenha: '',
        confsenha: '',
      }
    }
  },
  methods: {
    ...mapActions(['alterarSenha']),
    async novaSenha() {
      const data = {
        token: this.dados.token,
        password: this.dados.novasenha,
        confpassword: this.dados.confsenha
      }
      if (!!data.token && data.password === data.confpassword) {
        this.alterarSenha(data)
        .then(() => {
          this.exibirModalSucesso = true
          this.erros = []
        })
        .catch(erros => {
          this.erros = erros
        })
      } else {
        this.erros = ['As senhas não coincidem']
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
