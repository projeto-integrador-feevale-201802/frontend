<template>
  <div>
    <h1>Cadastrar usuário</h1>

    <form class="login" @submit.prevent="cadastrarUsuario">
      <input-box texto="Nome" tipo="texto" v-model="nome" />
      <input-box texto="Senha" tipo="password" v-model="senha" />
      <input-box texto="E-mail" tipo="email" v-model="email" />

      <div>
        <label class="input-line">
          Avatar
        </label>
        <input
          type="file"
          @change="pegarArquivo($event.target.files[0])"
          accept="image/*"
          class="input-file"
        >
      </div>

      <error-box v-if="erros.length" :erros="erros" />

      <button type="submit">Cadastrar</button>
    </form>

    <b-modal v-model="exibirModalSucesso" @hidden="this.$router.push('/login')" title="Sucesso">
      Cadastro criado com sucesso
    </b-modal>
  </div>
</template>

<script>
import InputBox from './InputBox.vue';
import ErrorBox from './ErrorBox.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    InputBox,
    ErrorBox
  },
  data () {
    return {
      nome: '',
      email: '',
      senha: '',
      avatar: null,
      erros: [],
      exibirModalSucesso: false
    }
  },
  methods: {
    ...mapActions([
      'criarUsuario'
    ]),
    cadastrarUsuario () {
      const dados = {
        nome: this.nome,
        senha: this.senha,
        email: this.email,
        avatar: this.avatar
      };

      this.criarUsuario(dados)
      .then(() => this.exibirModalSucesso = true)
      .catch(erros => this.erros = erros)
    },
    pegarArquivo (arquivo) {
      // TODO
      console.log(arquivo)
    }
  }
}
</script>

<style>

</style>
