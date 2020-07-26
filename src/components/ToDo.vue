<template>
  <v-card outlined>
    <v-card-title
      class="todo-title py-1 subtitle-1"
      @click="toggle"
    >
      {{ toDo.title || 'Sem título' }}
      <v-spacer />
      <v-icon v-if="!toDo.open" color="success">check</v-icon>
    </v-card-title>
    <v-expand-transition>
      <div v-show="opened">
        <v-card-text class="py-2">{{ toDo.description || '-' }}</v-card-text>
        <v-divider />
        <v-card-actions class="py-0">
          <v-spacer />
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                small
                icon
                color="primary"
                :loading="loading"
                @click="edit"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small>edit</v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                small
                icon
                color="red"
                :loading="loading"
                @click="confirmRemove"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small>delete</v-icon>
              </v-btn>
            </template>
            <span>Remover</span>
          </v-tooltip>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'ToDo',
  props: {
    value: { Type: Object, default: () => ({}) }
  },
  data: () => ({
    loading: false,
    toDo: {},
    opened: false
  }),
  watch: {
    value (val) {
      this.updateTodo(val)
    }
  },
  mounted () {
    this.updateTodo(this.value)
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    },
    async edit () {
      try {
        await this.$DialogToDo.open(this.toDo)
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    updateTodo (val) {
      this.toDo = JSON.parse(JSON.stringify(val))
    },
    async remove () {
      this.loading = true
      const id = this.value.id
      const frame_id = this.value.frame_id
      try {
        await this.$store.dispatch('todos/removeToDo', { id, frame_id })
      } catch (e) {
        this.showError(e)
      }
      this.loading = false
    },
    async confirmRemove () {
      try {
        await this.$ConfirmDialog.open({
          title: 'Confirmação',
          msg: 'Tem certeza que deseja remover essa tarefa?'
        })
        this.remove()
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
}
</script>
