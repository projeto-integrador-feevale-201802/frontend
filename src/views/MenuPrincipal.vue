<template>
  <ul>
    <li @click="sair">Sair</li>
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
