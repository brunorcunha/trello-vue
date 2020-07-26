<template>
  <v-menu>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            icon
            dark
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon>palette</v-icon>
          </v-btn>
        </template>
        <span>Trocar as Cores</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="theme in themes"
        :key="`t${theme.value}`"
        @click="changeTheme(theme)"
      >
        <v-list-item-title>{{ theme.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'Themes',
  data: () => ({
    themes: [
      { text: 'Tema Padrão', value: 'light' },
      { text: 'Tema Alternativo', value: 'dark' }
    ]
  }),
  methods: {
    changeTheme (theme) {
      this.$store.dispatch('configs/setTheme', theme.value)
    }
  }
}
</script>
