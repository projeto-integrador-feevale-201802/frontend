<template>
  <div id="app">
    <router-view v-if="$route.meta.esconderMenu"/>
    <template v-else>
      <menu-principal v-if="!$route.meta.esconderMenu" />
      <div class="content">
        <router-view/>
      </div>
    </template>
  </div>
</template>

<script>
import MenuPrincipal from '@/views/MenuPrincipal.vue';

export default {
  components: {
    MenuPrincipal,
  },
}
</script>


<style>
#app {
  width: 100%;
  margin: 15px auto 0 auto;
}

.escondido {
  display: none;
}

.content {
  width: 960px;
  margin: 0 auto;
}
</style>
