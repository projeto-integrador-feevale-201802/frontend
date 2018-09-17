<template>
  <div id="container">
    <h1>Cadastrar</h1>

    <form class="login" @submit.prevent="cadastrarUsuario">
      <input-box texto="Nome" tipo="text" v-model="nome" />
      <input-box texto="Senha" tipo="password" v-model="senha" />
      <input-box texto="E-mail" tipo="email" v-model="email" />

      <div>
        <button type="button" class="btn btn-default" @click="$refs.arq.click()">Avatar</button>
        <span v-if="nomeAvatar" class="nome-avatar">{{nomeAvatar}}</span>
      </div>

      <input
        type="file"
        @change="pegarArquivo($event.target.files[0])"
        accept="image/*"
        class="escondido"
        ref="arq"
      >

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
import InputBox from './InputBox.vue';
import ErrorBox from './ErrorBox.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    InputBox,
    ErrorBox
  },
  data() {
    return {
      nome: '',
      email: '',
      senha: '',
      avatar: null,
      nomeAvatar: '',
      erros: [],
      exibirModalSucesso: false
    };
  },
  methods: {
    ...mapActions([
      'criarUsuario'
    ]),
    cadastrarUsuario() {
      const dados = {
        name: this.nome,
        password: this.senha,
        email: this.email,
        profileImg: this.avatar
      };

      this.criarUsuario(dados)
        .then(() => {
          this.exibirModalSucesso = true;
        })
        .catch(erros => {
          this.erros = erros;
        });
    },
    pegarArquivo(arquivo) {
      this.nomeAvatar = arquivo.name;
    },
  },
};
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
