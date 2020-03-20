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
      <test-buttons />
    </v-content>
    <toast />
  </v-app>
</template>

<script>
import TestButtons from './pages/TestButtons';
import Toast from './components/Toast';

export default {
  name: 'App',

  components: {
    TestButtons,
    Toast,
  },

  data: () => ({
    //
  }),
};
</script>
