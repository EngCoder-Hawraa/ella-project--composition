<!--Composition API-->
<script setup>
import AppNav from "@/components/global/AppNav.vue";
import AppFooter from "@/components/global/AppFooter.vue";
import CartDrawer from "@/components/global/CartDrawer.vue";
import FixedNav from "@/components/global/FixedNav.vue";
// You can define reactive variables here if needed
// const drawer = ref(true);
</script>
<template>
  <div class="layout">
    <v-layout class="position-relative">
      <cart-drawer />
      <v-main style="padding-top: 150px">
        <slot></slot>
      </v-main>
      <AppNav />
      <FixedNav />
      <AppFooter />
    </v-layout>
  </div>
</template>
