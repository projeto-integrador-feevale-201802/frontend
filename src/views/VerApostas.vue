<template>
  <div>
    <b-form class="filtros">
      <b-form-select
        class="filtro"
        :options="rodadas"
        v-model="rodadaSelecionada"
      />

      <b-form-select
        :options="usuarios.map(x => ({text: x.nome, value: x.id}))"
        v-model="usuarioSelecionado"
        class="input-sm filtro"
      />
    </b-form>

    <b-list-group class="listagem">
      <b-list-group-item v-for="(r, i) in resultados" :key="i" :variant="acertos.has(i - 1) ? 'success' : ''">
        {{r.home}} {{r.actualScoreHome}} ({{r.betScoreHome}}) x ({{r.betScoreVisistor}}) {{r.actualScoreVisitor}} {{r.visitor}}
      </b-list-group-item>
    </b-list-group>
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
      resultados: [
        {
          home: 'Internacional',
          visitor: 'Palmeiras',
          actualScoreHome: 1,
          betScoreHome: 2,
          actualScoreVisitor: 1,
          betScoreVisistor: 0
        },
        {
          home: 'Gremio',
          visitor: 'Sport',
          actualScoreHome: 3,
          betScoreHome: 3,
          actualScoreVisitor: 4,
          betScoreVisistor: 4
        },
        {
          home: 'Flamengo',
          visitor: 'Santos',
          actualScoreHome: 3,
          betScoreHome: 3,
          actualScoreVisitor: 1,
          betScoreVisistor: 0
        }
      ]
    }
  },
  computed: {
    acertos() {
      const indices = this.resultados
        .filter(r => r.betScoreHome === r.actualScoreHome && r.betScoreVisistor === r.actualScoreVisitor)
        .map((r, i) => i)

      return new Set(indices)
    }
  }
}
</script>

<style>
.filtros {
  width: 250px;
  margin: 0 auto;
}

.filtro {
  margin-bottom: 5px;
}

.listagem {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}
</style>
