<template>
  <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$emit('close')"><v-icon>mdi-close</v-icon></v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text>Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>General</v-subheader>
        <v-list-item v-for="setting in settings" :key="`setting_${setting.name}`">
          <v-list-item-content>
            <v-list-item-title>{{setting.name}}</v-list-item-title>
            <v-list-item-subtitle v-if="setting.detail">{{setting.detail}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch v-if="setting.type === Boolean" v-model="setting.value" :label="`${setting.value ? ' ON' : ' OFF'}`"></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

  name: 'SettingsMenu',
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      auto_update_time: false, 
      settings: [ 
        {
          key: "auto_update_time",
          type: Boolean,
          value: false,
          name: 'Auto-update time on connect', 
          detail: 'On connection, immediately set clock time to this device\'s current time', 
        }, 
        {
          key: "auto_connect", 
          type: Boolean, 
          value: false, 
          name: 'Auto-connect to first found', 
          detail: 'Connect automatically to first valid device found', 
        }
      ]        
    }
  },
  methods: {
    handleSave() {
      this.$emit('save', this.parsedSettings)
    }
  },
  computed: {
    parsedSettings() {
      return this.settings
    }
  }
}
</script>
