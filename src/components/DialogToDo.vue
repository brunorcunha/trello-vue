<template>
  <v-dialog
    persistent
    v-model="dialog"
    width="500"
  >
    <v-card>
      <v-toolbar
        flat
        dense
        dark
        color="primary"
      >
        Editar Tarefa
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pt-4">
        <v-form v-model="valid" v-if="todo">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                outlined
                dense
                label="Título da Tarefa"
                v-model="todo.title"
                :placeholder="todo.title"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                dense
                hide-details
                label="Descrição da Tarefa"
                v-model="todo.description"
                :placeholder="todo.description"
              />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                outlined
                dense
                hide-details
                :input-value="!todo.open"
                @change="todo.open = !$event"
                label="Tarefa Concluída"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="success"
          class="px-6"
          text
          @click="editTodo"
          :loading="loading"
          :disabled="!valid"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogToDo',
  data: () => ({
    valid: false,
    todo: null,
    loading: false,
    dialog: false
  }),
  methods: {
    open (todo) {
      this.todo = JSON.parse(JSON.stringify(todo))
      this.dialog = true
    },
    async editTodo () {
      this.loading = true
      try {
        await this.$store.dispatch('todos/updateToDo', this.todo)
        this.close()
      } catch (e) {
        this.showError(e)
      }
      this.loading = false
    },
    close () {
      this.todo = null
      this.dialog = false
    }
  }
}
</script>
