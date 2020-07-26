<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      flat
      dense
    >
      <v-icon class="inverted" large left>assessment</v-icon>
      <v-toolbar-title>Quadro de Tarefas</v-toolbar-title>
      <v-spacer />
      <Themes />
    </v-app-bar>

    <v-main class="grey lighten-5">
      <Home />
    </v-main>

    <SnackBar ref="snackBar" />
    <DialogToDo ref="dialogToDo" />
    <ConfirmDialog ref="confirmDialog" />
  </v-app>
</template>

<script>
import Vue from 'vue'
import Home from '@/views/Home'
import SnackBar from '@/components/SnackBar'
import DialogToDo from '@/components/DialogToDo'
import ConfirmDialog from '@/components/ConfirmDialog'
import Themes from '@/components/Themes'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Themes,
    ConfirmDialog,
    DialogToDo,
    Home,
    SnackBar
  },
  computed: {
    ...mapGetters('configs', ['theme'])
  },
  watch: {
    theme () {
      this.defineTheme()
    }
  },
  mounted () {
    Vue.prototype.$SnackBar = this.$refs.snackBar
    Vue.prototype.$DialogToDo = this.$refs.dialogToDo
    Vue.prototype.$ConfirmDialog = this.$refs.confirmDialog

    this.defineTheme()
  }
}
</script>

<style>
  @import 'App.css';
</style>
