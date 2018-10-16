<template>
  <p v-if="classificacao.length === 0">{{mensagem}}</p>
  <b-table v-else hover :items="classificacao"></b-table>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      mensagem: 'Carregando tabela do brasileirão...',
      classificacao: []
    }
  },
  methods: {
    ...mapActions([
      'buscarClassificacaoTimes'
    ])
  },
  async beforeMount() {
    try {
      this.classificacao = await this.buscarClassificacaoTimes()
    } catch (err) {
      this.mensagem = err + ''
    }
  }
};
</script>
