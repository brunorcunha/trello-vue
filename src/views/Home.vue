<template>
  <v-container fill-height fluid>
    <div id="loading" v-if="firstLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      />
    </div>
    <div id="board" v-else>
      <draggable
        v-model="lists"
        v-bind="dragOptions"
        handle=".list-title"
        @end="updateOrder"
      >
        <v-scale-transition group>
          <template v-for="list in lists">
            <div
              :id="list.id"
              class="list-wrapper"
              :key="`l${list.id}`"
            >
              <List :value="list" />
            </div>
          </template>
        </v-scale-transition>
      </draggable>
      <div class="list-wrapper">
        <v-card outlined>
          <AddButton
            labelInput="Título da Lista"
            labelButton="Adicionar Lista"
            :loading="loading"
            @click="addList"
          />
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import List from '@/components/List'
import AddButton from '@/components/AddButton'

export default {
  name: 'Home',
  components: {
    List,
    AddButton
  },
  data: () => ({
    firstLoading: false,
    loading: false,
    dragOptions: { animation: 200 }
  }),
  computed: {
    lists: {
      get () { return this.$store.getters['todos/lists'] || [] },
      set (lists) { this.$store.commit('todos/setLists', lists) }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.firstLoading = true
      try {
        await this.$store.dispatch('todos/init')
        this.firstLoading = false
      } catch (e) {
        this.showError(e)
      }
    },
    async addList (title) {
      this.loading = true
      const order = this.lists.length
      try {
        await this.$store.dispatch('todos/addList', { title, order })
      } catch (e) {
        this.showError(e)
      }
      this.loading = false
    },
    async updateOrder () {
      try {
        await this.$store.dispatch('todos/updateListOrder')
      } catch (e) {
        this.showError(e)
      }
    }
  }
}
</script>
