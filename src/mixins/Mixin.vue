<script>
import themes from '../themes'

export default {
  methods: {
    showError (msg) {
      this.$SnackBar.open('Ocorreu um erro durante a requisição no servidor.', 'error')
      console.error(msg)
    },
    defineTheme () {
      const variables = themes[this.theme]
      Object.keys(variables).forEach(e => this.$vuetify.theme.themes.light[e] = variables[e])
    }
  }
}
</script>
