<template>
  <div>
    <b-form class="filtros">
      <b-form-select
        :options="rodadas"
        v-model="rodadaSelecionada"
      />

      <b-form-select
        :options="usuarios.map(x => ({text: x.nome, value: x.id}))"
        v-model="usuarioSelecionado"
        class="input-sm"
      />
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rodadas: [1,2,3,4,5,6],
      rodadaSelecionada: 1,
      usuarios: [{ nome: 'Gabriel', id: 1 }, { nome: 'Ândres', id: 2 }, { nome: 'João', id: 3 }],
      usuarioSelecionado: 1,
      resultados: null
    }
  }
}
</script>

<style>
.filtros {
  width: 30%;
  margin: 0 auto;
}
</style>
