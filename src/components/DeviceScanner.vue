<template>
  <div v-if="show">
    <v-dialog v-model="show">
      <v-card>
        <v-card-title>
          <v-icon>mdi-bluetooth-connect</v-icon>{{devices.length}} Devices
        </v-card-title>
        <v-progress-linear v-if="scanning" indeterminate color="secondary"></v-progress-linear>
        <v-card-text>
          <v-list shaped>
            <v-list-item v-for="(device, index) in orderedDevices" :key="`device_${device.name}`" :disabled="!isBtModule(device)" @click="$emit('device-selected', device)">
              <!-- name, address, id, class   -->
              <v-list-item-icon>
                <v-icon>{{ isBtModule(device) ? 'mdi-clock-digital' : 'mdi-bluetooth'}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <div class="d-flex align-center justify-space-between">
                  <div>{{device.name}}</div>
                  <div v-if="index === 0 && autoconnect_timeout !== null" class="d-flex justify-space-between align-center">
                    <div class="caption secondary--text">Autopairing...</div>
                    <v-progress-circular :value="autoconnectProgress" />
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="$emit('dialog-closed')">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'DeviceScanner',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    devices: {
      type: Array,
      default: () => ([])
    },
    scanning: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      autoconnect_refresh: 500,
      autoconnect_delay_time: 3000,
      autoconnect_remaining: -1,
      autoconnect_timeout: null,
    }
  },
  computed: {
    orderedDevices() {
      // DaClack first
      return this.devices.concat().sort((d1, d2) => {
        if (this.isBtModule(d1))
          return -1
        if (this.isBtModule(d2))
          return 1
        return 0
      })
      // const result =  this.devices.concat().sort((d1, d2) => {
      //   return d1.name < d2.name ? -1 : d1.name === d2.name ? 0 : 1
      // })
      // console.log("Ordeered: ", result)
      // return result
    },
    autoconnectProgress() {
      const newval = (this.autoconnect_delay_time - this.autoconnect_remaining) / this.autoconnect_delay_time * 100
      console.log("Progress: ", newval)
      return Math.ceil(newval)
    }
  },
  methods: {
    isBtModule(device) {
      return device.address.startsWith('20:15:05')
    },
    startAutoConnectCountdown(device) {
      const loop = () => {
        this.autoconnect_remaining -= this.autoconnect_refresh
        console.log("Countdown: ", this.autoconnect_remaining)
        if (this.autoconnect_remaining < 0) {
          this.$emit('device-selected', device)
          this.autoconnect_timeout = null
          return
        }
        this.autoconnect_timeout = setTimeout(loop, this.autoconnect_refresh)
      }

      this.autoconnect_remaining = this.autoconnect_delay_time
      loop()
    },
  },
  watch: {
    orderedDevices(newval) {
      if (newval.length && this.isBtModule(newval[0]) && this.autoconnect_timeout === null) {
        this.startAutoConnectCountdown(newval[0])
      }
    }
  }
}
</script>