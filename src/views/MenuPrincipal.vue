<template>
  <b-list-group id="menu-principal">
    <b-list-group-item v-for="(rota, i) in rotas" :key="i">
      <strong v-if="ehRotaAtual(rota)">{{rota.nome}}</strong>
      <router-link v-else :to="rota.endpoint" :key="$route.fullPath">{{rota.nome}}</router-link>
    </b-list-group-item>
    <b-list-group-item>
      <a href="" @click="sair">Sair</a>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      rotas: [
        { endpoint: '/', nome: 'Home' },
        { endpoint: '/perfil', nome: 'Meu perfil' },
        { endpoint: '/ver-apostas', nome: 'Ver apostas' },
        { endpoint: '/apostar', nome: 'Apostar' },
        { endpoint: '/ranking', nome: 'Ranking' },
      ]
    }
  },
  methods: {
    ...mapActions([
      'deslogar'
    ]),
    sair() {
      this.deslogar()
    },
    ehRotaAtual(rota) {
      return this.$router.currentRoute.path === rota.endpoint
    }
  }
}
</script>

<style>
  #menu-principal {
    overflow: hidden;
    position: fixed;
    margin-left: 10px;
    width: 150px;
    text-decoration: none;
  }
</style>
