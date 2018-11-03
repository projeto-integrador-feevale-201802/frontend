<template>
  <div id="container">
    <h1>Meu perfil</h1>

    <p v-if="dados.name === ''">Carregando dados...</p>
    <form v-else class="login" @submit.prevent="atualizarPerfil">
      <input-box texto="Nome" tipo="text" v-model="dados.name" />
      <input-box texto="E-mail" tipo="email" v-model="dados.email" apenasleitura="true" />
      <error-box v-if="erros.length" :erros="erros" />
      <button type="submit" class="btn btn-primary cadastrar">Atualizar perfil</button>
    </form>

    <b-modal
      v-model="exibirModalSucesso"
      @hidden="$router.push('/perfil')"
      title="Sucesso"
      ok-only>
      Perfil atualizado com sucesso
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
      dados: {
        name: '',
        email: '',
        id: undefined
      },
      exibirModalSucesso: false,
      erros: []
    }
  },
  methods: {
    ...mapActions([
      'atualizarUsuario',
      'carregarDadosUsuario'
    ]),
    atualizarPerfil() {
      const data = {
        name: this.dados.name,
        id: this.dados.id
      }
      this.atualizarUsuario(data)
        .then(() => {
          this.exibirModalSucesso = true
          this.erros = []
        })
        .catch(erros => {
          this.erros = [erros]
        })
    }
  },
  async beforeMount() {
    try {
      this.dados = await this.carregarDadosUsuario()
    } catch (err) {
      this.mensagem = err + ''
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
  text-align: left;
}

.cadastrar {
  display: block;
  margin: 25px auto;
}
</style>
