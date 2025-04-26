<!--Composition API-->
<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

// define props and emits using compiler macros (no import needed)
const props = defineProps({
  popup: Boolean,
});
const emit = defineEmits(["close_popup"]);

const router = useRouter();
const cartStore = useCartStore();

const dialog = ref(false);

// Watch for dialog close and redirect
watch(dialog, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      emit("close_popup");
      router.push({ name: "home" });
    }, 400);
  }
});

function resetData() {
  cartStore.resetItems();
  dialog.value = false;
}

onMounted(() => {
  dialog.value = props.popup;
});
</script>

<template>
  <div class="order-success">
    <v-dialog v-model="dialog" width="50%" persistent>
      <v-card class="text-center py-7">
        <div class="text-center">
          <v-icon
            size="75"
            color="green"
            style="
              background: white;
              color: green;
              width: 100px;
              height: 100px;
              border-radius: 50%;
              font-size: 76px;
              border: 1px solid green;
            "
            >mdi-check</v-icon
          >
        </div>
        <v-card-title
          style="font-size: 30px; font-weight: bold; color: rgb(93, 93, 93)"
        >
          Order Placed Successfully!
        </v-card-title>
        <v-card-text style="font-size: 17px; color: rgb(134, 134, 134)"
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          culpa eos esse in incidunt magni obcaecati officiis pariatur possimus,
          praesentium quasi reprehenderit tempore unde veniam voluptate. Autem
          dolores nobis voluptate!</v-card-text
        >
        <v-card-actions class="mt-5 justify-center">
          <v-btn variant="elevated" color="blue" @click="resetData"
            >Got it!</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style scoped lang="scss"></style>
