<!--Composition API-->
<script setup>
import { onMounted, computed } from "vue";
import { useProductsStore } from "@/stores/products";
import UpperBanner from "@/components/home_page/UpperBanner.vue";
import TheFeatures from "@/components/home_page/TheFeatures.vue";
import TopOffers from "@/components/home_page/TopOffers.vue";
import ProductsComponent from "@/components/home_page/ProductsSwiper.vue";
import TopCats from "@/components/home_page/TopCategories.vue";
import NewProducts from "@/components/home_page/NewProducts.vue";
import QualityFeatures from "@/components/home_page/QualityFeatures.vue";
import WhyShopwithus from "@/components/home_page/WhyShopwithus.vue";

const productsStore = useProductsStore();

const flashDeals = computed(() => productsStore.flashDeals);
const newProducts = computed(() => productsStore.newProducts);
const fragrances = computed(() => productsStore.fragrances);
const furniture = computed(() => productsStore.furniture);

onMounted(async () => {
  await productsStore.getProducts();
});
</script>
<template>
  <div class="home">
    <UpperBanner />
    <TheFeatures />
    <TopOffers />

    <ProductsComponent
      v-if="flashDeals && flashDeals.length"
      :products="flashDeals"
      title="Flash Deals"
      titleColor="red"
      :index="0"
    />

    <TopCats />
    <NewProducts
      v-if="newProducts && newProducts.length"
      :products="newProducts"
      :index="0"
    />

    <QualityFeatures />

    <ProductsComponent
      v-if="fragrances && fragrances.length"
      :products="fragrances"
      title="Top Fragrances"
      titleColor="#404040"
      :index="1"
    />

    <v-container fluid>
      <v-row>
        <v-col cols="6" class="pr-5">
          <img
            src="@/assets/images/band-left-cover.webp"
            alt=""
            class="w-100"
          />
        </v-col>
        <v-col cols="6" class="pl-5">
          <img
            src="@/assets/images/band-right-cover.webp"
            alt=""
            class="w-100"
          />
        </v-col>
      </v-row>
    </v-container>

    <ProductsComponent
      v-if="furniture && furniture.length"
      :products="furniture"
      title="Top Furniture"
      titleColor="#404040"
      :index="2"
    />

    <ProductsComponent
      v-if="groceries && groceries.length"
      :products="groceries"
      title="Groceries"
      titleColor="#404040"
      :index="3"
    />

    <WhyShopwithus />
  </div>
</template>
