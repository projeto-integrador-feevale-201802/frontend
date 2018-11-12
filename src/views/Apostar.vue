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
// <<<<<<< HEAD
//       jogos: [],
//       apostas: [],
//       usuario: null,
//       mensagem: 'Carregando listagem...'
// =======
      viewApostas: null,
      apostas: {},
      mensagem: 'Carregando...'
    }
  },
  methods: {
    ...mapActions([
// <<<<<<< HEAD
//       'carregarDadosUsuario',
//       'salvarAposta',
//       'buscarJogos',
//       'buscarNovasRodadas'
// =======
      'salvarApostas',
      'buscarViewApostas'
// >>>>>>> 3d111379284d9e2888317686f29ce34e90978bbf
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
        x.scoreHome = parseInt(x.scoreHome) || null
        x.scoreVisitor = parseInt(x.scoreVisitor) || null
        apostas.push(x)
      }

      this.salvarApostas(apostas)
        .then(() => {
          this.exibirModalSucesso = true
        })
        .catch(erros => {
          this.erros = erros
        })
    }
  },
  watch: {
    async rodadaSelecionada() {
// <<<<<<< HEAD
//       try {
//         this.jogos = []
//         this.jogos = await this.buscarJogos({
//             usuario: this.usuario.id,
//             rodada: this.rodadaSelecionada
//           })
// =======
      this.viewApostas = null
      this.mensabem = 'Carregando dados da rodada ' + this.rodadaSelecionada + '...'

      try {
        this.viewApostas = await this.buscarViewApostas({
          rodadaSelecionada: this.rodadaSelecionada
        })
// >>>>>>> 3d111379284d9e2888317686f29ce34e90978bbf
      } catch (err) {
        this.mensagem = err + ''
      }
    },
    viewApostas() {
      if (this.viewApostas === null) {
        return
      }

// <<<<<<< HEAD
//       setTimeout(() => {
//         for (let i = 1; i < this.jogos.length; i++) {
//           var aposta = {
//             idMatch: this.jogos[i].id,
//             idUser: this.usuario.id
//           }
//           this.apostas.push(aposta)
//         }
//       }, 1500);
//     }
//   },
//   async beforeMount() {
//     try {
//       this.usuario = await this.carregarDadosUsuario()
//       this.rodadas = await this.buscarNovasRodadas()
//     } catch (err) {
//       this.mensagem = err + ''
//     }
// =======
      this.apostas = {}

      for (const { idMatch } of this.viewApostas) {
        this.apostas[idMatch] = { idMatch }
      }
    }
  },
  mounted() {
    this.rodadaSelecionada = 1
// >>>>>>> 3d111379284d9e2888317686f29ce34e90978bbf
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
