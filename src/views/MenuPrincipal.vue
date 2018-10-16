<template>
  <ul id="menu-principal">
    <li>
      <router-link to="/">Home</router-link>
    </li>
    <li>
      <router-link to="/perfil">Meu perfil</router-link>
    </li>
    <li>
      <router-link to="/ver-apostas">Ver apostas</router-link>
    </li>
    <li>
      <router-link to="/apostar">Apostar</router-link>
    </li>
    <li>
      <router-link to="/ranking">Ranking</router-link>
    </li>
    <li>
      <a href="" @click="sair">Sair</a>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'deslogar'
    ]),
    sair() {
      this.deslogar()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
  #menu-principal {
    overflow: hidden;
    position: fixed;
    left: 0;
    width: 150px;
    text-decoration: none;
  }
</style>
