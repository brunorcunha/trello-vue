<template>
  <v-snackbar
    top
    v-model="visible"
    :timeout="timeout"
    :color="color"
    elevation="24"
  >
    {{ msg }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  data: () => ({
    visible: false,
    timeout: 2000,
    color: 'red',
    msg: ''
  }),
  methods: {
    async open (msg, color, timeout) {
      this.close()
      await this.$nextTick()

      this.visible = true
      this.timeout = timeout || 2000
      this.color = color
      this.msg = msg
    },
    close () {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
