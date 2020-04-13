<template>
  <v-card>
    <v-btn @click="showDate">Show date</v-btn>
    <v-btn @click="updateDate">Set current time</v-btn>
    <div class="d-flex ">
      <v-input text></v-input>
      <v-btn>Display text</v-btn>
    </div>
    <v-btn class="error" @click="$emit('disconnect')">Disconnect</v-btn>
  </v-card>
</template>
<script>
export default {

  name: 'ControlPanel',

  data() {
    return {
      commands: {
        SHOW_DATE: "DATE",
        SET_TIME: "ST",
        SET_TIMEZONE: "SZ",
        SHOW_TEXT: "TX",
        SETTINGS: {
          TEXT_SCROLL_DELAY: "SX"
        }
      }
    }
  },
  methods: {
    showDate() {
      this.sendCommand(this.commands.SHOW_DATE)
    },
    updateDate() {
      this.sendCommand(`${this.commands.SET_TIME}${Math.floor(Date.now()/1000)}`)
      setTimeout(() => {
        this.sendCommand(`${this.commands.SET_TIMEZONE}-4`)
      },200)
    },
    sendCommand(cmd) {
      console.log("Sending command ", cmd)
      this.$emit('send-command', cmd)
    }
  }
}
</script>