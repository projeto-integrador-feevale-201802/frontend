<template>
  <p v-if="lista === null">{{mensagem}}</p>
  <b-table
    v-else
    class="tabela"
    hover
    :items="listaComIndice"
    :fields="{posicao: 'Posição', nome: 'Nome', pontuacao: 'Pontuação'}"
  ></b-table>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      lista: null,
      mensagem: 'Carregando ranking...'
    }
  },
  computed: {
    listaComIndice() {
      let posicao = 1

      this.lista[0].posicao = posicao

      for (let i = 1; i < this.lista.length; i++) {
        if (this.lista[i].pontuacao !== this.lista[i - 1].pontuacao) {
          posicao = i + 1
        }

        this.lista[i].posicao = posicao
      }

      return this.lista
    }
  },
  methods: {
    ...mapActions([
      'buscarClassificacaoUsuarios'
    ])
  },
  async beforeMount() {
    try {
      this.lista = await this.buscarClassificacaoUsuarios()
    } catch (err) {
      this.mensagem = err + ''
    }
  }
}
</script>

<style scoped>
.tabela {
  text-align: center;
}
</style>
