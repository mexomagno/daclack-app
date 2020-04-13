<template>
  <div v-if="show">
    <v-dialog v-model="show">
      <v-card>
        <v-card-title><v-icon>mdi-bluetooth-connect</v-icon>{{devices.length}} Devices</v-card-title>
        <v-progress-linear  v-if="scanning" indeterminate color="secondary"></v-progress-linear>
        <v-card-text>
          <v-list shaped>
            <v-list-item v-for="device in orderedDevices" :key="`device_${device.name}`" :disabled="!isBtModule(device)" @click="$emit('device-selected', device)">
              <!-- name, address, id, class   -->
              <v-list-item-icon>
                <v-icon>{{ isBtModule(device) ? 'mdi-clock-digital' : 'mdi-bluetooth'}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
              <div>{{device.name}}</div>
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
  name: 'DevicesList',
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
    }
  }, 
  methods: {
    isBtModule(device){
      return device.address.startsWith('20:15:05')
    }
  }
}
</script>