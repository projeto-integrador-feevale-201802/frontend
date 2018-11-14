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

    <template v-if="usuarios !== null && viewApostas !== null">
      <b-list-group v-if="viewApostas.length > 0" class="listagem">
        <b-list-group-item v-for="(a, i) in viewApostas" :key="i" >
          {{a.nameHome}} {{a.actualScoreHome}} ({{a.betScoreHome}})
          x
          ({{a.betScoreVisitor}}) {{a.actualScoreVisitor}} {{a.nameVisitor}}
        </b-list-group-item>
      </b-list-group>
      <p v-else>O usuário não fez nenhuma aposta nesta rodada</p>
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
      viewApostas: null,
      mensagem: 'Carregando usuários...'
    }
  },
  computed: {
    acertos() {
      const indices = new Set()

      for (let i = 0; i < this.viewApostas.length; i++) {
        const r = this.viewApostas[i]

        if (r.betScoreHome === r.actualScoreHome && r.betScoreVisitor === r.actualScoreVisitor) {
          indices.add(i)
        }
      }

      return indices
    }
  },
  methods: {
    ...mapActions([
      'buscarUsuarios',
      'buscarViewApostas'
    ]),
    async atualizar() {
      if (this.usuarioSelecionado === null || this.rodadaSelecionada === null) {
        return
      }

      this.viewApostas = null
      this.mensagem = 'Carregando...'

      try {
        const apostas = await this.buscarViewApostas({
          rodadaSelecionada: this.rodadaSelecionada,
          usuarioSelecionado: this.usuarioSelecionado
        })
        this.viewApostas = apostas.filter(x => x.betScoreHome !== null)
      } catch (err) {
        this.mensagem = err + ''
        this.usuarios = null
      }
    }
  },
  watch: {
    async usuarioSelecionado() {
      this.atualizar()
    },
    async rodadaSelecionada() {
      this.atualizar()
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

    this.usuarioSelecionado = this.usuarios[0].id
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
