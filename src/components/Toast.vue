<template>
  <v-snackbar :color="color" v-model="show" class="font-weight-bold"> {{msg}} </v-snackbar>
</template>
<script>
import EventBus from '../event-bus'

export default {

  name: 'Toast',

  data() {
    return {
      msg: '',
      color: "info",
      show: false
    }
  },
  methods: {
    info(msg) {
      this.show = true
      this.color = "info"
      this.msg = msg
    },
    success(msg) {
      this.show = true
      this.color = "success"
      this.msg = msg
    },
    warning(msg) {
      this.show = true
      this.color = "warning"
      this.msg = msg
    },
    error(msg) {
      this.show = true
      this.color = "error"
      this.msg = msg
    }
  },
  mounted(){ 
    EventBus.$on('toast-info', (msg) => {this.info(msg)})
    EventBus.$on('toast-success', (msg) => {this.success(msg)})
    EventBus.$on('toast-warning', (msg) => {this.warning(msg)})
    EventBus.$on('toast-error', (msg) => {this.error(msg)})
  }
}
</script>
<style lang="css" scoped>
</style>