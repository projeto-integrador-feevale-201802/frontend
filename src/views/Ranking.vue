<template>
  <div>
    <b-table
      class="tabela"
      hover
      :items="listaComIndice"
    ></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lista: [
        {
          nome: 'Gabriel',
          pontuacao: 41
        }
      ]
    }
  },
  computed: {
    listaComIndice() {
      return this.lista.map((x, i) => ({posicao: i + 1, ...x}))
    }
  }
}
</script>

<style scoped>
.tabela {
  text-align: center;
}
</style>
