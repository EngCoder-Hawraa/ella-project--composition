<!--Composition API-->
<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

// props
defineProps({
  popup: {
    type: Boolean,
  },
});

// emits
const emit = defineEmits(["close_popup"]);

// router
const router = useRouter();

// store
const cartStore = useCartStore();

// dialog state
const dialog = ref(false);

// watch dialog for closing
watch(dialog, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      emit("close_popup");
      router.push({ name: "home" });
    }, 400); // matching v-dialog transition duration
  }
});

// reset data and close dialog
function resetData() {
  cartStore.resetItems();
  dialog.value = false;
}

// sync initial popup state with dialog
onMounted(() => {
  dialog.value = popup;
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
