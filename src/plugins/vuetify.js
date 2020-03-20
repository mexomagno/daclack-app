import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

// eslint-disable-next-line no-unused-vars
const defaultColors = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
}

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#0d1064',
        // secondary: '#31797F',
        accent: '#aa2222',
        // background: '#4a595e',
        // background: '#c1dfe4',
        // deactivated: '#9da4a3',
      },
    },
  },
});