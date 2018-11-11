<template>
  <div>
    <b-form v-if="usuarios !== null" class="filtros">
      <b-form-select
        class="filtro"
        :options="rodadas"
        v-model="rodadaSelecionada"
      />

      <b-form-select
        :options="usuarios.map(x => ({text: x.name, value: x.id}))"
        v-model="usuarioSelecionado"
        class="input-sm filtro"
      />
    </b-form>
    <p v-else>{{mensagem}}</p>

    <template v-if="usuarios !== null">
      <b-list-group v-if="apostas !== null" class="listagem">
        <b-list-group-item v-for="(r, i) in apostas" :key="i" :variant="acertos.has(i - 1) ? 'success' : ''">
          <!-- {{r.home}} {{r.actualScoreHome}} ({{r.betScoreHome}}) x ({{r.betScoreVisistor}}) {{r.actualScoreVisitor}} {{r.visitor}} -->
          {{r.home}} {{r.scoreHome}} ({{r.betScoreHome}}) x ({{r.betScoreVisistor}}) {{r.scoreVisitor}} {{r.visitor}}
        </b-list-group-item>
      </b-list-group>
      <p v-else>Carregando apostas...</p>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      rodadas: [],
      rodadaSelecionada: null,
      usuarioSelecionado: null,
      usuarios: null,
      apostas: null,
      mensagem: 'Carregando usuários...'
    }
  },
  computed: {
    acertos() {
      const indices = this.apostas
        .filter(r => r.betScoreHome === r.actualScoreHome && r.betScoreVisistor === r.actualScoreVisitor)
        .map((r, i) => i)

      return new Set(indices)
    }
  },
  methods: {
    ...mapActions([
      'buscarUsuarios',
      'buscarApostas',
      'buscarRodadasEncerradas'
    ])
  },
  watch: {
    async usuarioSelecionado() {
      this.apostas = null

      try {
        if (!!this.usuarioSelecionado && !!this.rodadaSelecionada) {
          this.apostas = await this.buscarApostas({
            usuario: this.usuarioSelecionado,
            rodada: this.rodadaSelecionada
          })
        }
      } catch (err) {
        this.mensagem = err + ''
        this.usuarios = null
      }
    },
    async rodadaSelecionada() {
      this.apostas = null

      try {
        if (!!this.usuarioSelecionado && !!this.rodadaSelecionada) {
          this.apostas = await this.buscarApostas({
            usuario: this.usuarioSelecionado,
            rodada: this.rodadaSelecionada
          })
        }
      } catch (err) {
        this.mensagem = err + ''
        this.usuarios = null
      }
    }
  },
  async beforeMount() {
    try {
      for (let i = 1; i <= 38; i++) {
        this.rodadas.push(i)
      }

      this.rodadaSelecionada = 1
      // this.rodadas = await this.buscarRodadasEncerradas()
      this.usuarios = await this.buscarUsuarios()
    } catch (err) {
      this.mensagem = err + ''
      return
    }

    setTimeout(() => {
      this.usuarioSelecionado = this.usuarios[0].id
    }, 1000);
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
