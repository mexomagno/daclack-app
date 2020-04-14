<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="text-center py-8" v-for="action in actions" :key="`action_${action.name}`" :class="`${action.color}`" @click="action.action">
        <v-icon>mdi-{{action.icon}}</v-icon>
        <div>{{action.name}}</div>
      </v-col> 
    </v-row>
    <div class="pre">
      <div v-for="(response, index) in responses" :key="`response_${index}`">
        {{response}}
      </div>
    </div>
    <!-- <div>
      
    <v-btn @click="showDate">Show date</v-btn>
    <v-btn @click="updateDate">Set current time</v-btn>
    <div class="d-flex ">
      <v-input text></v-input>
      <v-btn>Display text</v-btn>
    </div>
    <v-btn class="error" @click="$emit('disconnect')">Disconnect</v-btn>
    </div> -->
  </v-container>
</template>
<script>
import EventBus from '@/event-bus'
export default {

  name: 'ControlPanel',

  data() {
    return {
      actions: [
        {
          name: "Update Time",
          icon: "clock",
          color: "cyan",
          action: this.updateDate
        },
        {
          name: "Show date",
          icon: "calendar",
          color: "yellow",
          action: this.showDate,
        }, 
        {
          name: "Say hello",
          icon: "text",
          color: "lime",
          action: this.sayHello
        }
      ],
      commands: {
        SHOW_DATE: "DATE",
        SET_TIME: "ST",
        SET_TIMEZONE: "SZ",
        SHOW_TEXT: "TX",
        SETTINGS: {
          TEXT_SCROLL_DELAY: "SX"
        }
      }, 
      responses: []
    }
  },
  mounted() {
    EventBus.$on('new-response', (val) => {
      this.responses.push(val)
    })
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
    sayHello(){
      this.sendCommand(`${this.commands.SHOW_TEXT}Wena chuchaetumare xdd`)
    },
    sendCommand(cmd) {
      console.log("Sending command ", cmd)
      this.$emit('send-command', cmd)
    }
  }
}
</script>