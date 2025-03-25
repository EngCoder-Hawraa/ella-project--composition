<!--Composition API-->
<script setup>
import { defineComponent } from "vue";
import AppLayout from "@/components/global/AppLayout.vue";

// Using Composition API
defineComponent({
  components: {
    AppLayout,
  },
});
</script>
<template>
  <app-layout>
    <router-view />
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
</style>
