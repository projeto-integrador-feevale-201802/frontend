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
          {{jogos[i].home}} <input type="number" class="input-gols" v-model="a.scoreHome"> x <input type="number" class="input-gols" v-model="a.scoreVisitor"> {{jogos[i].visitor}}
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
      jogos: null,
      apostas: null,
      mensagem: 'Carregando listagem...'
    }
  },
  methods: {
    ...mapActions([
      'salvarAposta'
    ]),
    gravar() {
      console.log(this.apostas)
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
    rodadaSelecionada: function() {
      this.jogos = null

      setTimeout(() => {
        this.apostas = [
          { idMatch: this.rodadaSelecionada, idUser: 1 },
          { idMatch: this.rodadaSelecionada, idUser: 1 },
          { idMatch: this.rodadaSelecionada, idUser: 1 },
        ]
        this.jogos = [
          { home: 'Internacional', visitor: 'Palmeiras' },
          { home: 'Gremio', visitor: 'Santos' },
          { home: 'Atlético Mineiro', visitor: 'Atlético Paranaense' },
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
