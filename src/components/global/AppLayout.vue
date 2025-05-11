<!--Composition API-->
<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import AppNav from "@/components/global/AppNav.vue";
import AppFooter from "@/components/global/AppFooter.vue";
import CartDrawer from "@/components/global/CartDrawer.vue";
import FixedNav from "@/components/global/FixedNav.vue";
import ResponsiveNav from "@/components/global/ResponsiveNav.vue";
import MenuDrawer from "@/components/global/MenuDrawer.vue";

// reactive variables
// const drawer = ref(true);
const showFixed = ref(false);
const windowWidth = ref(0);

// functions
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const handleScroll = () => {
  if (window.scrollY >= 205) {
    showFixed.value = true;
  } else {
    showFixed.value = false;
  }
};

// lifecycle hooks
onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="layout">
    <v-layout class="position-relative">
      <cart-drawer :windowWidth="windowWidth" />
      <MenuDrawer :windowWidth="windowWidth" />
      <v-main
        :style="{
          paddingTop:
            $route.name === 'check_out'
              ? '0px'
              : windowWidth <= 990
              ? '60px'
              : '150px',
        }"
      >
        <slot></slot>
      </v-main>
      <AppNav
        v-show="$route.name != 'check_out' && !showFixed && windowWidth > 990"
      />
      <ResponsiveNav
        v-show="windowWidth <= 990 && $route.name != 'check_out'"
      />
      <FixedNav
        v-show="$route.name != 'check_out' && !showFixed && windowWidth > 990"
      />
      <AppFooter v-show="$route.name != 'check_out'" />
    </v-layout>
  </div>
</template>
