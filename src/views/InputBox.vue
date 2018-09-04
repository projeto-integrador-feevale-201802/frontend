<template>
  <div>
    <label class="input-line">{{texto}}</label>
    <input :type="tipo" v-model="valor">
  </div>
</template>

<script>
export default {
  props: ['texto', 'tipo', 'value'],
  data () {
    return {
      valor: this.value
    }
  },
  watch: {
    valor () {
      this.$emit('input', this.valor)
    }
  }
}
</script>

<style>

</style>
