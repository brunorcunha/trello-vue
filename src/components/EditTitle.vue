<template>
  <div class="flex-shrink-0 flex-grow-1">
    <div v-if="!editTitle" @click="open">{{ value }}</div>
    <template v-else>
      <v-text-field
        ref="title"
        outlined
        dense
        hide-details
        v-model="title"
        :placeholder="value"
        @keypress.enter="changeTitle"
        @click.stop="prevent"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'EditTitle',
  props: {
    value: { Type: String, default: '' }
  },
  data: () => ({
    title: '',
    editTitle: false
  }),
  methods: {
    prevent () {},
    changeTitle () {
      if (this.title.length === 0 || this.title === this.value) return
      this.$emit('change', this.title)
    },
    async open () {
      this.editTitle = true
      this.addEvent()
      await this.$nextTick()
      this.$refs.title.focus()
    },
    close () {
      this.changeTitle()
      this.removeEvent()
      this.editTitle = false
      this.title = ''
    },
    addEvent () {
      setTimeout(() => document.getElementById('app').addEventListener('click', this.close, false), 250)
    },
    removeEvent () {
      document.getElementById('app').removeEventListener('click', this.close, false)
    }
  }
}
</script>
