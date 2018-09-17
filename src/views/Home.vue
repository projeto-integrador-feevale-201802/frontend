<template>
  <div class="home">
      <menu-principal />

      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>

    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import MenuPrincipal from '@/views/MenuPrincipal.vue';

export default {
  name: 'home',
  components: {
    MenuPrincipal,
  },
};
</script>
