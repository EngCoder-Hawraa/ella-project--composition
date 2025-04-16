<!--Composition API-->
<script setup>
import { ref, inject, onMounted } from "vue";
import AppLayout from "@/components/global/AppLayout.vue";
import QuickView from "@/components/global/QuickView.vue";

// Inject emitter
const Emitter = inject("Emitter");

// Reactive state
const bar = ref(false);
const itemTitle = ref("");

// Handle "showMsg" event
onMounted(() => {
  if (Emitter) {
    Emitter.on("showMsg", (data) => {
      itemTitle.value = data;
      bar.value = true;
    });
  }
});
</script>
<template>
  <app-layout>
    <router-view />
    <QuickView />
    <v-snackbar
      v-model="bar"
      location="left-bottom"
      max-width="300"
      timeout="3000"
      >{{ itemTitle }} has been added to your cart successfully!
      <template v-slot:actions>
        <v-icon @click="bar = false">mdi-close</v-icon>
      </template></v-snackbar
    >
  </app-layout>
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.v-rating__wrapper {
  margin-right: 5px;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
