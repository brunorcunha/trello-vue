<template>
  <v-dialog
    persistent
    v-model="dialog"
    :max-width="options.width"
    @keydown.esc="cancel"
  >
    <v-toolbar
      dense
      dark
      :color="options.color"
    >
      <v-toolbar-title
        :class="[(options.color === 'white') ? 'black--text' : 'white--text']"
      >
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="cancel">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card tile>
      <v-col
        class="body-1"
        v-show="!!msg"
      >
        {{ msg }}
      </v-col>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          color="gray"
          @click="cancel"
        >
          {{ label.cancel }}
        </v-btn>
        <v-btn
          text
          color="success"
          @click="confirm"
        >
          {{ label.confirm }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    title: null,
    msg: null,
    label: {
      confirmar: ''
    },
    options: {
      color: 'primary',
      width: 450
    }
  }),
  methods: {
    open (obj) {
      this.dialog = true
      this.title = obj.title
      this.msg = obj.msg
      this.label.cancel = obj.label ? obj.label.cancel : 'Cancelar'
      this.label.confirm = obj.label ? obj.label.confirm : 'Confirmar'
      this.options = { ...this.options, ...obj.options }

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    confirm () {
      this.resolve()
      this.dialog = false
    },
    cancel () {
      this.reject()
      this.dialog = false
    }
  }
}
</script>
