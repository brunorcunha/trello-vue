<template>
  <v-card outlined>
    <v-card-title class="list-title py-1 pr-1">
      <EditTitle :value="list.title" @change="changeTitle" />
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
            <v-icon>delete_forever</v-icon>
          </v-btn>
        </template>
        <span>Remover</span>
      </v-tooltip>
    </v-card-title>

    <v-divider />

    <v-card-text class="pa-0">
      <draggable
        v-model="list.todos"
        v-bind="dragOptions"
        handle=".todo-title"
        group="todos"
        class="drag-wrapper"
        @end="updateOrder"
        @add="onAdd"
      >
        <template v-for="todo in list.todos">
          <v-row no-gutters class="mb-2" :key="`t${todo.id}`" :id="todo.id">
            <v-col>
              <ToDo :value="todo" />
            </v-col>
          </v-row>
        </template>
      </draggable>
    </v-card-text>

    <v-divider />

    <AddButton
      labelInput="Título da Tarefa"
      labelButton="Adicionar Tarefa"
      :loading="loading"
      @click="addTodo"
    />
  </v-card>
</template>

<script>
import ToDo from '@/components/ToDo'
import AddButton from '@/components/AddButton'
import EditTitle from '@/components/EditTitle'

export default {
  name: 'Frame',
  components: {
    EditTitle,
    AddButton,
    ToDo
  },
  props: {
    value: { Type: Object, default: () => ({}) }
  },
  data: () => ({
    loading: false,
    list: {},
    editTitle: false,
    dragOptions: { animation: 200 }
  }),
  watch: {
    value (val) {
      this.list = JSON.parse(JSON.stringify(val))
    }
  },
  mounted () {
    this.list = JSON.parse(JSON.stringify(this.value))
  },
  methods: {
    async addTodo (title) {
      this.loading = true
      const order = (this.value.todos || []).length
      const frame_id = this.value.id
      try {
        await this.$store.dispatch('todos/addToDo', { title, order, frame_id })
      } catch (e) {
        this.showError(e)
      }
      this.loading = false
    },
    async remove () {
      this.loading = true
      const id = this.value.id
      try {
        await this.$store.dispatch('todos/removeList', id)
      } catch (e) {
        this.showError(e)
      }
      this.loading = false
    },
    async confirmRemove () {
      try {
        await this.$ConfirmDialog.open({
          title: 'Confirmação',
          msg: 'Tem certeza que deseja remover essa lista?'
        })
        this.remove()
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async onAdd (evt) {
      const itemID = evt.item.id
      const fromListID = evt.from.parentElement.parentElement.parentElement.id
      const toListID = evt.to.parentElement.parentElement.parentElement.id
      const newIndex = evt.newIndex
      const oldIndex = evt.oldIndex
      try {
        await this.$store.dispatch('todos/changeToDoList', {
          itemID,
          fromListID,
          toListID,
          oldIndex,
          newIndex
        })
      } catch (e) {
        this.showError(e)
      }
    },
    async updateOrder () {
      try {
        await this.$store.dispatch('todos/updateToDoOrder', this.list)
      } catch (e) {
        this.showError(e)
      }
    },
    async changeTitle (title) {
      this.list.title = title
      try {
        await this.$store.dispatch('todos/updateTitle', this.list)
      } catch (e) {
        this.showError(e)
      }
    }
  }
}
</script>
