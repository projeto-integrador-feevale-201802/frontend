<template>
  <div>
    <b-form class="filtros">
      <b-form-select
        :options="rodadas"
        v-model="rodadaSelecionada"
      />
    </b-form>

    <template v-if="jogos !== null">
      <b-list-group class="listagem">
        <b-list-group-item v-for="(a, i) in apostas" :key="i">
          {{jogos[i].nameHome}} <input type="number" class="input-gols" v-model="a.scoreHome"> x <input type="number" class="input-gols" v-model="a.scoreVisitor"> {{jogos[i].nameVisitor}}
        </b-list-group-item>
      </b-list-group>

      <b-button variant="primary" @click="gravar" class="btn-gravar">Gravar</b-button>
    </template>
    <p v-else>{{mensagem}}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      rodadas: [],
      rodadaSelecionada: null,
      jogos: [],
      apostas: null,
      mensagem: 'Carregando listagem...'
    }
  },
  methods: {
    ...mapActions([
      'salvarAposta',
      'buscarJogos'
    ]),
    gravar() {
      this.salvarAposta(this.apostas)
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
      this.jogos = null

      try {
        this.jogos = await this.buscarJogos(this.rodadaSelecionada)
      } catch (err) {
        this.mensagem = err + ''
        return
      }

      setTimeout(() => {
        this.apostas = [
          { idMatch: this.rodadaSelecionada, idUser: 1 },
          { idMatch: this.rodadaSelecionada, idUser: 1 },
          { idMatch: this.rodadaSelecionada, idUser: 1 },
        ]
      }, 1500);
    }
  },
  async beforeMount() {
    for (let i = 1; i <= 38; i++) {
      this.rodadas.push(i)
    }

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
</style>
