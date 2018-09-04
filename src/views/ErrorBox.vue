<template>
    <div id="error-box">
      <span v-if="typeof erros.length === 1" class="erro">
        {{erros[0]}}
      </span>
      <ul v-else>
        <li v-for="(erro, i) in erros" :key="i">
          <span class="erro">{{erro}}</span>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: ['erros']
}
</script>

<style>
#error-box .erro {
  color: red;
}
</style>
