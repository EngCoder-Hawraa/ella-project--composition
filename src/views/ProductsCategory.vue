<!--Composition API-->
<script setup>
import { inject, ref, computed, watch, onMounted } from "vue";
import { useProductsStore } from "@/stores/products";
import { VSkeletonLoader } from "vuetify/components";
import { useRoute } from "vue-router";

// بيانات تفاعلية
const showenItem = ref({});
const loading = ref(false);

// استخدام المتجر من Pinia
const productsStore = useProductsStore();

// استخدام computed للوصول إلى الحالة في المتجر
const categoryProducts = computed(() => productsStore.categoryProducts);

// دالة جلب المنتجات حسب الفئة
const getProductsByCategory = async (category) => {
  loading.value = true;
  await productsStore.getProductsByCategory(category);
  loading.value = false;
};

// مراقبة التغيرات في الـ route
const route = useRoute();
watch(
  () => route.params.category,
  async () => {
    document.documentElement.scrollTo(0, 0);
    loading.value = true;
    await getProductsByCategory(route.params.category);
    loading.value = false;
  }
);

// استدعاء المنتجات عند تحميل المكون
onMounted(async () => {
  loading.value = true;
  await getProductsByCategory(route.params.category);
  loading.value = false;
});

// Injected global emitter
const Emitter = inject("Emitter");

// Composition API: Methods
function openQuickView(product) {
  Emitter?.emit("openQuickView", product);
}
</script>
<template>
  <div class="products-category mt-10">
    <h1 class="text-center">{{ $route.params.title }}</h1>
    <v-container>
      <v-card class="pt-5" min-height="700px" elevation="0">
        <v-row v-if="loading">
          <v-col cols="3" v-for="num in 4" :key="num">
            <v-skeleton-loader
              type="image, article, button"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="!loading">
          <v-col
            cols="3"
            v-for="item in categoryProducts.products"
            :key="item.id"
            class="px-5"
          >
            <v-lazy>
              <v-card elevation="0" class="pb-5">
                <v-hover v-slot="{ isHovering, props }">
                  <div
                    class="img-parent position-relative"
                    style="height: 160px; overflow: hidden"
                  >
                    <img
                      :src="
                        showenItem[item.title]
                          ? showenItem[item.title]
                          : item.thumbnail
                      "
                      class="w-100"
                      :style="`height: 100%; transition: 0.5s all ease-in-out;cursor: pointer;scale: ${
                        isHovering ? 1.05 : 1
                      }`"
                      alt=""
                      v-bind="props"
                    />
                    <v-btn
                      density="compact"
                      width="90"
                      height="30"
                      variant="outlined"
                      class="bg-white quick-view-btn"
                      style="
                        text-transform: none;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        border-radius: 30px;
                        font-size: 12px;
                        transition: 0.2s all ease-in-out;
                        opacity: 0;
                      "
                      @click="openQuickView(item)"
                      >Quick View</v-btn
                    >
                  </div>
                </v-hover>
                <v-card-text class="pl-0 pb-1">
                  {{
                    `(${item.title}) ${item.description}`.length <= 100
                      ? `(${item.title}) ${item.description}`
                      : `(${item.title}) ${item.description}`.substring(
                          0,
                          100
                        ) + "..."
                  }}
                </v-card-text>
                <v-rating
                  v-model="item.rating"
                  half-increments
                  readonly
                  color="yellow-darken-2"
                  size="x-small"
                  density="compact"
                ></v-rating>
                <v-card-text class="pl-0 pt-0">
                  <del>${{ item.price }}</del> From
                  <span
                    class="text-red"
                    style="font-weight: 900; font-size: 16px"
                    >${{
                      Math.ceil(
                        item.price -
                          item.price * (item.discountPercentage / 100)
                      )
                    }}</span
                  >
                </v-card-text>
                <v-btn-toggle v-model="showenItem[item.title]">
                  <v-btn
                    v-for="(pic, i) in item.images"
                    :value="pic"
                    :key="i"
                    size="x-small"
                    rounded="xl"
                    :ripple="false"
                    ><img
                      :src="pic"
                      alt=""
                      width="30"
                      height="30"
                      style="
                        border-radius: 50%;
                        border: 1px solid rgb(135, 135, 135);
                      "
                  /></v-btn>
                </v-btn-toggle>
                <div class="mt-5">
                  <v-btn
                    density="compact"
                    width="220"
                    height="35"
                    style="text-transform: none; border-radius: 30px"
                    variant="outlined"
                    @click="
                      $router.push({
                        name: 'products_details', // ✅ corrected name
                        params: { productId: item.id },
                      })
                    "
                    >Choose Options</v-btn
                  >
                </div>
              </v-card>
            </v-lazy>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<style scoped lang="scss">
.products-category {
  .img-parent:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
}
</style>
