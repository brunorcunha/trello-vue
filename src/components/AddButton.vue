<template>
  <v-expand-transition>
    <v-btn
      v-if="!activated"
      text
      block
      color="primary"
      :loading="loading"
      @click="open"
    >
      <v-icon left>add</v-icon> {{ labelButton }}
    </v-btn>
    <div v-else>
      <v-card-text class="pb-0">
        <v-text-field
          clearable
          outlined
          dense
          hide-details
          :label="labelInput"
          ref="title"
          v-model="title"
          @keypress.enter="addList"
          @click.stop="prevent"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          dense
          depressed
          block
          color="primary"
          :loading="loading"
          @click="addList"
        >
          {{ labelButton }}
        </v-btn>
      </v-card-actions>
    </div>
  </v-expand-transition>
</template>

<script>
export default {
  name: 'AddListButton',
  props: {
    labelInput: { type: String, default: '' },
    labelButton: { type: String, default: '' },
    loading: { type: Boolean, default: false }
  },
  data: () => ({
    activated: false,
    title: ''
  }),
  methods: {
    prevent () {},
    addList () {
      this.title = this.title.trim()
      if (this.title) {
        this.$emit('click', this.title)
      }
      this.close()
    },
    async open () {
      this.activated = true
      this.addEvent()
      await this.$nextTick()
      this.$refs.title.focus()
    },
    close () {
      this.activated = false
      this.title = ''
      this.removeEvent()
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
