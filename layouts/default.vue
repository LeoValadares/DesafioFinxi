<template>
  <v-app standalone>
    <v-container fill-height fluid text-xs-center>
      <section class="container">
        <nuxt/>
      </section>
    </v-container>
    <my-footer/>
    <!-- sem necessidade de ssr -->
    <no-ssr>
      <v-snackbar
        :timeout="5000"
        :top="true"
        :right="true"
        :multi-line="true"
        v-model="snackbar">
        {{ snackText }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </no-ssr>
  </v-app>
</template>

<script>
import MyFooter from '~/components/Footer.vue'
import NoSSR from 'vue-no-ssr'
import EventBus from '~/EventBus'

export default {
  components: {
    MyFooter,
    'no-ssr': NoSSR
  },
  data () {
    return {
      snackbar: false, // controla visibilidade da snackbar
      snackText: '' // texto a ser mostrado na snackbar
    }
  },
  created () {
    EventBus.$on('toastr', this.snackReceived) // recebe evento da snac
  },
  methods: {
    snackReceived (text) {
      this.snackbar = true
      this.snackText = text
    }
  }
}
</script>
