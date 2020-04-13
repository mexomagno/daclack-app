<template>
  <v-dialog>
    <v-card>
      <v-card-title v-if="title">{{title}}</v-card-title>
      <v-card-text>
        <div v-if="subtitle" class="heading">{{subtitle}}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="negativeButton" @click="$emit('negative-click')">{{negativeButton}}</v-btn>
        <v-btn v-if="neutralButton" @click="$emit('neutral-click')">{{neutralButton}}</v-btn>
        <v-btn v-if="positiveButton" @click="$emit('positive-click')">{{positiveButton}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

  name: 'BaseDialog',
  props: {
    title: {
      type: String,
      default: ''
    }, 
    subtitle: {
      type: String,
      default: ''
    },
    negativeButton: {
      type: String,
      default: null
    },
    neutralButton: {
      type: String,
      default: 'Close'
    },
    positiveButton: {
      type: String,
      default: null
    },
  },
  data () {
    return {

    }
  },
}
</script>