<template>
  <p v-if="lista === null">{{mensagem}}</p>
  <b-table
    v-else
    class="tabela"
    hover
    :items="listaComIndice"
    :fields="{posicao: 'Posição', name: 'Nome', points: 'Pontuação'}"
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
      const lista = this.lista.map(x => x)
      let posicao = 1

      lista[0].posicao = posicao

      for (let i = 1; i < lista.length; i++) {
        if (lista[i].points !== lista[i - 1].points) {
          posicao = i + 1
        }

        lista[i].posicao = posicao
      }

      return lista
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
