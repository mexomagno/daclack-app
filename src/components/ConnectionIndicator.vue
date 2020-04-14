<template>
  <div :class="`${statusColor} text-center pa-2 elevation-3`">
    <div>{{statusName}}</div>
    <v-icon>mdi-{{statusIcon}}</v-icon>
    <v-progress-circular indeterminate v-if="connecting"></v-progress-circular>
  </div>
</template>

<script>
export default {

  name: 'ConnectionIndicator',
  props: {
    connected: {
      type: Boolean
    },
    connecting: {
      type: Boolean
    }
  },
  data () {
    return {

    }
  }, 
  computed: {
    statusName(){
      return this.connecting ? "Connecting" : this.connected ? "Connected" : "Disconnected"
    }, 
    statusIcon(){
      return this.connecting ? '' : this.connected ? 'wifi' : 'wifi-off'
    },
    statusColor(){
      return this.connecting ? 'warning' : this.connected ? 'success' : 'error'
    }
  }
}
</script>
