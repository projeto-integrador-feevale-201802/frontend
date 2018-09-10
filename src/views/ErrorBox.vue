<template>
    <div class="alert alert-danger" role="alert">
      <div v-for="(erro, i) in erros" :key="i">
        <span>·</span> {{erro}}
        <br v-if="i !== erros.length"/>
      </div>
  </div>
</template>

<script>
export default {
  props: ['erros']
}
</script>

<style scoped>
span {
  font-weight: 900;
}
</style>
