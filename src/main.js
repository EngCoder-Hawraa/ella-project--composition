import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Pinia config
import { createPinia } from "pinia";

// Emitter Config
import mitt from "mitt";
const Emitter = mitt();

// Swiper Config
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi"; // Use Material Design Icons
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi", // Ensure default icon set is defined
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

// Proper initialization order
app.use(createPinia());
app.provide("Emitter", Emitter);
app.use(router);
app.use(vuetify);

// Mount the app
app.mount("#app");
