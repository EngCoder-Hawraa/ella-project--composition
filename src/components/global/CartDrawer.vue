<!--Composition API-->
<script setup>
import { inject, ref, onMounted } from "vue";

// Inject the Emitter
const Emitter = inject("Emitter");

// Create a ref for the drawer state
const drawer = ref(false);

// Set up the listener in the `onMounted` lifecycle hook
onMounted(() => {
  Emitter.on("openCart", () => {
    drawer.value = true;
  });
});
</script>
<template>
  <div class="drawer">
    <v-navigation-drawer location="right" temporary v-model="drawer">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, autem
        cumque delectus doloremque fuga ipsam iure mollitia odio officia optio
        perferendis praesentium quam recusandae repellendus sequi vero voluptas,
        voluptatibus voluptatum.
      </p>
    </v-navigation-drawer>
  </div>
</template>
<style scoped lang="scss"></style>
