import Vue from "vue";
import Vuetify from "vuetify";
import colors from 'vuetify/lib/util/colors';
import '@mdi/font/css/materialdesignicons.css';
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: colors.cyan.darken1,
        secondary: colors.cyan.lighten4,
        accent: colors.cyan.base,
      },
    },
    options: { customProperties: true },
  },
};

export default new Vuetify(opts);
