<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="logo"
          class="shrink mr-2"
          contain
          src="@/assets/applogo.png"
          transition="scale-transition"
          width="40"
        />

        <div class="display-1 font-weight-bold">DaClack</div>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/mexomagno/DaClak"
        target="_blank"
        text
      >
        <span class="mr-2">Repo</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-btn v-if="!connected" @click="discover">Scan</v-btn>
      <div class="title">Debug</div>
      <div><pre>{{debug}}</pre></div>
      <div v-for="(device, index) in discoveredDevices" :key="`device_${index}`">{{device}}</div>
      <devices-list :show="showScan" :scanning="scanning" :devices="discoveredDevices" @device-selected="connectToDevice" @dialog-closed="showScan = false"/>
    </v-content>
    <toast />
  </v-app>
</template>

<script>
// import TestButtons from './pages/TestButtons';
import Toast from './components/Toast';
import bluetoothSerial from 'cordova-plugin-bluetooth-serial/www/bluetoothSerial'
import EventBus from './event-bus'
import DevicesList from './components/DevicesList'

export default {
  name: 'App',

  components: {
    // TestButtons,
    Toast,
    DevicesList,
  },
  data: () => ({
    debug: '', 
    discoveredDevices: [], 
    showScan: false, 
    scanning: false,
    connected: false,
  }),

  mounted() {
    // Set device discovered listener
    bluetoothSerial.setDeviceDiscoveredListener(this.onDeviceDiscovered)

    bluetoothSerial.isEnabled((result) => {
      EventBus.$emit('toast-info', "IS ENABLED")
      console.log(result)
      this.discover()
      return
    },
    (result) => {
      EventBus.$emit('toast-error', "IS NOT ENABLED")
      console.log(result)
      bluetoothSerial.enable((result) => {
        EventBus.$emit('toast-info', "ENABLED")
        console.log(result)
        this.discover()
        return
      }, 
      (result) => {
        EventBus.$emit('toast-error', "COULD NOT ENABLEEE")
        console.log(result)
        return 
      })
      return
    }
    )

  }, 
  methods: {
    discover() {
      // Discover
      this.discoveredDevices = []
      EventBus.$emit('toast-info', "Discovering devices...")
      this.scanning = true
      this.showScan = true
      bluetoothSerial.discoverUnpaired(() => {
        this.scanning = false
      }, error => {
        this.scanning = false
        console.error("could not discover unpaired", error)
      })
    }, 
    onDeviceDiscovered(device){
      // push if not in list
      if (this.discoveredDevices.filter(d => (d.address === device.address)).length === 0){
        if (!device.name)
          device.name = device.address
        this.discoveredDevices.push(device)
      }
    }, 
    connectToDevice(device){
      console.log("Connecting to device", device)
    }
  }
};
</script>
