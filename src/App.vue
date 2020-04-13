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
      <div><pre>{{debug}}<v-btn class="error" @click="disconnect">Force Disconnect</v-btn></pre></div>
      <devices-list :show="showScan" :scanning="scanning" :devices="discoveredDevices" @device-selected="connectToDevice" @dialog-closed="showScan = false"/>
      <control-panel v-if="connected" :device="currentDevice" @send-command="sendCommand" @disconnect="disconnect"/>
    </v-content>
    <toast />
    <base-dialog v-if="disconnectDeviceDialog" title="Unsupported device connected" subtitle="Do you want to disconnect from your current bluetooth device" positiveButton="Disconnect" @positive-click="dialogAction()"/>
  </v-app>
</template>

<script>
// import TestButtons from './pages/TestButtons';
import Toast from './components/Toast';
import bluetoothSerial from 'cordova-plugin-bluetooth-serial/www/bluetoothSerial'
import EventBus from './event-bus'
import DevicesList from './components/DevicesList'
import ControlPanel from './pages/ControlPanel'

export default {
  name: 'App',

  components: {
    // TestButtons,
    Toast,
    DevicesList,
    ControlPanel,
  },
  data: () => ({
    debug: '', 
    discoveredDevices: [], 
    showScan: false, 
    scanning: false,
    connected: false,
    currentDevice: null,
    disconnectDeviceDialog: false,
    dialogAction: () => {}
  }),

  mounted() {
    // Set device discovered listener
    bluetoothSerial.setDeviceDiscoveredListener(this.onDeviceDiscovered)

    bluetoothSerial.isEnabled((result) => {
      console.log(result)
      this.checkConnected()
    },
    (result) => {
      console.log(result)
      EventBus.$emit('toast-info', "Enabling Bluetooth antenna...")
      bluetoothSerial.enable((result) => {
        console.log(result)
        this.checkConnected()
      }, 
      (result) => {
        EventBus.$emit('toast-error', "Could not enable Bluetooth!")
        console.error(result)
        return 
      })
    }
    )

  }, 
  methods: {
    checkConnected() {
      // Check if already connected to a daclack device
      bluetoothSerial.isConnected(() => {
        // Check if device is supported
        bluetoothSerial.disconnect(() => {
          this.connected = false
          this.currentDevice = null
          this.discover()
        }, error => {
          console.error("Could not disconnect from current device", error)
        })
      }, error => {
        console.log("not connected", error)
        this.discover()
      })
    },
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
      this.showScan = false
      console.log("Connecting to device", device)
      bluetoothSerial.connect(device.address, 
        result => {
        EventBus.$emit('toast-success', `Connected to '${device.name}'`)
        console.log("Connected", result)
        bluetoothSerial.subscribe('\n', result => {
          console.log("new data received: ", result)
          EventBus.$emit('new-response', result)
        }, error => {
          console.error("Error on subscription", error)
        })
        this.currentDevice = device
        this.connected = true
      }, error => {
        EventBus.$emit('toast-error', "Could not connect: " + error)
      })
    }, 
    disconnect(){
      if (!this.connected || !this.currentDevice)
        return
      bluetoothSerial.disconnect(result => {
        console.log("Disconnected: ", result)
        EventBus.$emit('toast-success', `Disconnected from '${this.currentDevice.name}'`)
        this.currentDevice = null
        this.connected = false
      }, error => {
        EventBus.$emit('toast-error', "Could not disconnect: " + error)
      })
    }, 
    isBtModule(device){
      return device.address.startsWith('20:15:05')
    }, 
    sendCommand(cmd){
      if (!this.connected || !this.currentDevice){
        console.log("No device connected")
        return
      }
      bluetoothSerial.write(cmd, result => {
        console.log("Sent data", result)
      }, error => {
        console.error("Error sending data: ", error)
      })
    }
  }
};
</script>
