<template>
  <div class="d-flex justify-center ">
  <div class="">
    <v-btn block large class="my-2 primary" v-for="cmd in commands" :key="cmd.name" @click="sendCommand(cmd.cmd)">
      <div class="d-flex align-center justify-center">
      {{ cmd.name }} <pre class="ml-2">[{{ cmd.cmd }}]</pre>
      </div>
    </v-btn>
  </div>
  </div>
</template>
<script>
import EventBus from '../event-bus'

export default {

  name: 'TestButtons',

  data() {
    return {
      toast: null 
    }
  },
  computed: {
    commands() {
      return [
      {
        name: "Get time",
        cmd: "TIME"
      },
      {
        name: "Get date",
        cmd: "DATE",
      },
      {
        name: "Update time",
        cmd: `ST${Math.floor(new Date().getTime())}`,
      }
      ]
    }
  }, 
  methods: {
    sendCommand(cmd) {
      EventBus.$emit('toast-info', `Sending ${cmd}`)
    }
  }
}
</script>
<style lang="css" scoped>
</style>