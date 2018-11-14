<template>
  <div class="form-group">
    <label>
      {{texto}}
      <input :type="tipo" class="form-control" v-model="valor" :readonly="apenasleitura" :placeholder="placeholder">
    </label>
  </div>
</template>

<script>
export default {
  props: ['texto', 'tipo', 'value', 'apenasleitura', 'placeholder'],
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
