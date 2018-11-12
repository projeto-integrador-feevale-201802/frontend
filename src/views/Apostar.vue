<template>
  <div>
    <b-form class="filtros">
      <b-form-select
        :options="rodadas"
        v-model="rodadaSelecionada"
      />
    </b-form>

    <template v-if="viewApostas !== null">
      <b-list-group class="listagem">
        <b-list-group-item v-for="(a, i) in viewApostas" :key="i">
          <template v-if="a.actualScoreHome === null">
            {{a.nameHome}}
            <input type="text" class="input-gols" v-model="apostas[a.idMatch].scoreHome">
            x
            <input type="text" class="input-gols" v-model="apostas[a.idMatch].scoreVisitor">
            {{a.nameVisitor}}
          </template>
          <div v-else :class="{'acertou': acertouPlacar(a)}">
            {{a.nameHome}} {{a.actualScoreHome}} <span v-if="a.betScoreHome !== null">({{a.betScoreHome}})</span>
            x
            <span v-if="a.betScoreVisitor !== null">({{a.betScoreVisitor}})</span> {{a.actualScoreVisitor}} {{a.nameVisitor}}
          </div>
        </b-list-group-item>
      </b-list-group>

      <b-button variant="primary" v-if="viewApostas.some(x => x.actualScoreHome === null)" @click="gravar" class="btn-gravar">Gravar</b-button>
    </template>
    <p v-else>{{mensagem}}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      rodadas: Array.from({ length: 38 }, (_, i) => i + 1),
      rodadaSelecionada: null,
      viewApostas: null,
      apostas: {},
      mensagem: 'Carregando...'
    }
  },
  methods: {
    ...mapActions([
      'salvarApostas',
      'buscarViewApostas'
    ]),
    acertouPlacar({actualScoreHome, actualScoreVisitor, betScoreHome, betScoreVisitor}) {
      return (
        actualScoreHome !== null &&
        actualScoreVisitor !== null &&
        betScoreHome !== null &&
        betScoreVisitor !== null &&
        actualScoreHome === betScoreHome &&
        actualScoreVisitor === betScoreVisitor
     )
    },
    gravar() {
      const apostas = []

      for (const idMatch of Object.keys(this.apostas)) {
        const x = this.apostas[idMatch]
        x.scoreHome = parseInt(x.scoreHome)
        x.scoreVisitor = parseInt(x.scoreVisitor)
        apostas.push(x)
      }

      this.salvarApostas(apostas)
        .then(() => {
          this.atualizar()
        })
        .catch(erros => {
          this.erros = erros
        })
    },
    async atualizar() {
      this.viewApostas = null
      this.mensabem = 'Carregando dados da rodada ' + this.rodadaSelecionada + '...'

      try {
        this.viewApostas = await this.buscarViewApostas({
          rodadaSelecionada: this.rodadaSelecionada
        })
      } catch (err) {
        this.mensagem = err + ''
      }
    }
  },
  watch: {
    async rodadaSelecionada() {
      await this.atualizar()
    },
    viewApostas() {
      if (this.viewApostas === null) {
        return
      }

      this.apostas = {}

      for (const v of this.viewApostas) {
        this.apostas[v.idMatch] = { idMatch: v.idMatch, scoreHome: v.betScoreHome, scoreVisitor: v.betScoreVisitor }
      }
    }
  },
  mounted() {
    this.rodadaSelecionada = 1
  }
}
</script>

<style>
.filtros {
  width: 250px;
  margin: 10px auto;
}

.listagem {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.input-gols {
  display: inline;
  max-width: 30px;
  text-align: center;
}

.btn-gravar {
  display: block;
  margin: 10px auto;
}

.acertou {
  font-weight: bold;
}
</style>
