<template>
  <div class="form-group">
    <label>
      {{texto}}
      <input :type="tipo" class="form-control" v-model="valor">
    </label>
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

<style scopped>
label {
  width: 100%;
}
</style>
