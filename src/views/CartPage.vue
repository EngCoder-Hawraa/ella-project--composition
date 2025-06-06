<!--Composition API-->
<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

const router = useRouter();
const cart = useCartStore();

// بيانات الدول
const countries = ref(["Egypt", "Lebanon", "America", "Syria", "Jordan"]);

// تحميل بيانات السلة عند تحميل المكون
onMounted(() => {
  cart.getCartItems();
});

// حساب المجموع الكلي
const calcTotalPrice = computed(() => {
  let total = 0;
  cart.cartItems.forEach((product) => {
    total +=
      Math.ceil(
        product.price - product.price * (product.discountPercentage / 100)
      ) * product.quantity;
  });
  return total;
});

// التوجيه لصفحة الدفع
const toCheckout = () => {
  cart.setToLocalStorage();
  router.push({ name: "check_out" });
};
</script>

<template>
  <div class="cart-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="pb-0 px-0">
          <v-breadcrumbs :items="['Home', 'Your Cart']" style="font-size: 13px">
            <template v-slot:divider>
              <v-icon color="#878484">mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
        <v-col cols="12" class="pt-0">
          <v-card-title
            class="pl-0 pr-2 pb-0 d-flex justify-space-between align-center w-100"
            style="font-size: 35px; font-weight: bold"
            >Your Cart
          </v-card-title>
          <div
            class="bar-parent mt-4 position-relative mr-2"
            v-if="cart.cartItems.length"
          >
            <svg
              class="icon-shipping-truck"
              viewBox="0 0 40.55 24"
              width="30"
              :fill="
                parseInt((calcTotalPrice / 10000) * 100) < 50
                  ? '#f44336'
                  : parseInt((calcTotalPrice / 10000) * 100) >= 50 &&
                    parseInt((calcTotalPrice / 10000) * 100) < 100
                  ? '#ff9800'
                  : '#4CAF50'
              "
              :style="`position: absolute;
              bottom: 50%;
              z-index: 1;
              left: calc(${
                parseInt((calcTotalPrice / 10000) * 100) <= 100
                  ? parseInt((calcTotalPrice / 10000) * 100)
                  : 100
              }% - 30px);
              transition: 0.15s all ease-in-out;`"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    class="truck-body"
                    d="M40.43,11a3.86,3.86,0,0,0-3.68-2.65H28a1.25,1.25,0,0,1-1.43-1.43c0-2.18,0-4.35,0-6.53,0-.31-.08-.36-.37-.36H5.11a1.18,1.18,0,0,0-1.3,1.32c0,.74,0,1.48,0,2.22,0,.21-.06.27-.26.26-.36,0-.71,0-1.07,0a1.19,1.19,0,1,0,0,2.37H7.19c.43,0,.85,0,1.27,0a1,1,0,0,1,1.07,1A1.19,1.19,0,0,1,8.24,8.48H1.35a1.83,1.83,0,0,0-.47,0A1.19,1.19,0,0,0,0,9.85a1.18,1.18,0,0,0,1.19,1h9.66c.34,0,.68,0,1,0A1.19,1.19,0,0,1,13,12.47a1.26,1.26,0,0,1-1.26.76H1.24a1.19,1.19,0,1,0,0,2.38c.76,0,1.51,0,2.26,0,.26,0,.33.07.32.32,0,1,0,2.09,0,3.13A1.18,1.18,0,0,0,5.1,20.36c.63,0,1.26,0,1.9,0,.27,0,.39.06.47.36a4.55,4.55,0,0,0,8.78-.11.29.29,0,0,1,.32-.25H28.09a.3.3,0,0,1,.34.27,4.55,4.55,0,0,0,8.8,0,.31.31,0,0,1,.35-.26c.49,0,1,0,1.47,0a1.37,1.37,0,0,0,1.5-.87V11.41C40.41,11.29,40.47,11.12,40.43,11ZM32.84,21.62A2.18,2.18,0,1,1,35,19.45,2.21,2.21,0,0,1,32.84,21.62Zm-21,0A2.18,2.18,0,1,1,14,19.45,2.2,2.2,0,0,1,11.86,21.62Z"
                  ></path>
                  <path
                    class="truck-body"
                    d="M29.27,6h5.85c.1,0,.2,0,.29,0C33.64,2.72,32,.91,28.91.26V.57c0,1.68,0,3.35,0,5C28.9,5.9,29,6,29.27,6Z"
                  ></path>
                  <path
                    class="wheel"
                    fill="white"
                    d="M11.87,17.27A2.18,2.18,0,1,0,14,19.45,2.2,2.2,0,0,0,11.87,17.27Z"
                  ></path>
                  <path
                    class="wheel"
                    fill="white"
                    d="M32.85,17.27A2.18,2.18,0,1,0,35,19.45,2.22,2.22,0,0,0,32.85,17.27Z"
                  ></path>
                </g>
              </g>
            </svg>
            <v-progress-linear
              :color="
                parseInt((calcTotalPrice / 10000) * 100) < 50
                  ? 'red'
                  : parseInt((calcTotalPrice / 10000) * 100) >= 50 &&
                    parseInt((calcTotalPrice / 10000) * 100) < 100
                  ? 'orange'
                  : 'green'
              "
              height="10"
              :model-value="
                parseInt((calcTotalPrice / 10000) * 100) <= 100
                  ? parseInt((calcTotalPrice / 10000) * 100)
                  : 100
              "
              striped
            ></v-progress-linear>
          </div>
          <v-card-text
            class="px-0 pt-2"
            style="color: #6f6f6f"
            v-if="cart.cartItems.length && 10000 - calcTotalPrice > 0"
            >Only ${{ 10000 - calcTotalPrice }} away from Free Shipping
          </v-card-text>
          <v-card-text
            class="px-0 pt-2"
            style="color: #6f6f6f"
            v-if="!cart.cartItems.length"
          >
            Free Shipping For All Orders Over $10000.00!
          </v-card-text>
          <v-card-text
            class="px-0 pt-2"
            style="color: #6f6f6f"
            v-if="cart.cartItems.length && 10000 - calcTotalPrice <= 0"
          >
            Your order now is included Free Shipping
          </v-card-text>
          <v-card-text
            class="px-0 pt-2 text-center mt-5"
            style="color: #6f6f6f"
            v-if="!cart.cartItems.length"
          >
            Your Cart Is Empty!
          </v-card-text>
          <v-card-actions
            class="px-0 justify-center"
            v-if="!cart.cartItems.length"
          >
            <v-btn
              class="mx-0"
              width="300"
              elevation="0"
              height="45"
              density="compact"
              variant="outlined"
              @click="$router.push({ name: 'home' })"
              style="
                text-transform: none;
                border-radius: 30px;
                border-color: rgb(199, 199, 199);
              "
            >
              Continue Shopping
            </v-btn>
          </v-card-actions>
        </v-col>
        <v-col cols="12" lg="8" class="px-3" v-if="cart.cartItems.length">
          <v-table class="w-100">
            <thead>
              <tr>
                <th style="font-size: 12px; font-weight: bold">PRODUCT</th>
                <th
                  class="text-center"
                  style="font-size: 12px; font-weight: bold"
                >
                  PRICE
                </th>
                <th
                  class="text-center"
                  style="font-size: 12px; font-weight: bold"
                >
                  QUANTITY
                </th>
                <th
                  class="text-center"
                  style="font-size: 12px; font-weight: bold"
                >
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.cartItems" :key="item.id">
                <td style="width: 55%">
                  <v-row class="align-center mb-4">
                    <v-col cols="5">
                      <img :src="item.thumbnail" class="w-100" alt="" />
                    </v-col>
                    <v-col cols="7">
                      <v-card-title
                        class="px-0"
                        style="
                          white-space: pre-wrap;
                          font-size: 14px;
                          line-height: 1.2;
                        "
                        >{{ item.title }} Sample -
                        {{ item.category }}</v-card-title
                      >
                      <v-card-text class="px-0 pb-0" style="color: #6f6f6f">
                        Category: {{ item.category }}
                      </v-card-text>
                    </v-col>
                  </v-row>
                </td>
                <td class="text-center" style="width: 15%">
                  ${{
                    Math.ceil(
                      item.price - item.price * (item.discountPercentage / 100)
                    )
                  }}
                </td>
                <td class="text-center" style="width: 15%">
                  <div
                    class="item-footer d-flex justify-space-between align-center"
                  >
                    <div
                      class="counter px-1"
                      style="
                        border-radius: 30px;
                        border: 1px solid rgb(201, 201, 201);
                        width: fit-content;
                      "
                    >
                      <v-icon
                        size="19"
                        color="#606060"
                        @click="item.quantity > 1 ? item.quantity-- : false"
                        >mdi-minus</v-icon
                      >
                      <input
                        type="number"
                        style="
                          border: none;
                          outline: none;
                          width: 35px;
                          font-size: 12px;
                          color: #606060;
                        "
                        class="text-center py-3"
                        min="1"
                        v-model="item.quantity"
                      />
                      <v-icon size="19" color="#606060" @click="item.quantity++"
                        >mdi-plus</v-icon
                      >
                    </div>
                  </div>
                </td>
                <td class="text-center" style="width: 15%">
                  ${{
                    Math.ceil(
                      item.price - item.price * (item.discountPercentage / 100)
                    ) * item.quantity
                  }}
                </td>
                <td class="text-center" style="width: 15%">
                  <v-icon size="22" @click="deleteItem(item.id)"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </v-table>

          <v-divider length="100%" color="black"></v-divider>
          <v-divider length="100%" color="black"></v-divider>
          <v-divider length="100%" color="black"></v-divider>

          <v-card-text
            class="px-0 pt-2 d-flex align-center mt-4"
            style="color: #6f6f6f; gap: 10px"
            v-if="cart.cartItems.length"
          >
            <span>
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 179.94 179.96"
                class="icon icon-shield-check"
                width="20"
              >
                <path
                  d="M90,0,5,42.78C13.73,105.26,38.14,154.32,90,180c51.83-25.64,76.25-74.7,85-137.18Z"
                ></path>
                <polygon
                  fill="white"
                  class="cls-1"
                  points="149.83 67.57 134.81 52.55 79.31 108.05 49.74 78.48 34.72 93.5 79.15 137.94 79.31 137.78 79.47 137.94 149.83 67.57"
                ></polygon>
              </svg>
            </span>
            <span> Secure Shopping Guarantee </span>
            <img
              src="@/assets/images/cart-page-cards.webp"
              alt=""
              width="270"
            />
          </v-card-text>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          class="px-3 mt-8 mt-lg-0"
          v-if="cart.cartItems.length"
        >
          <v-card elevation="0">
            <v-card-title style="font-size: 14px; font-weight: bold">
              ORDER SUMMARY
            </v-card-title>

            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>

            <v-card-text class="d-flex align-center justify-space-between">
              <span>Subtotal</span>
              <span class="font-weight-bold" style="font-size: 15px">
                ${{ calcTotalPrice }}
              </span>
            </v-card-text>

            <v-divider length="100%" color="black"></v-divider>

            <v-card-text> Get shipping estimate </v-card-text>

            <select
              class="w-100 pa-3"
              style="
                border: 1px solid rgb(184, 184, 184);
                border-radius: 30px;
                font-size: 14px;
              "
            >
              <option
                v-for="country in countries"
                :key="country"
                :value="country"
              >
                {{ country }}
              </option>
            </select>

            <div class="states">
              <select
                class="pa-3 mt-4"
                style="
                  border: 1px solid rgb(184, 184, 184);
                  border-radius: 30px;
                  font-size: 14px;
                  width: 55%;
                  margin-right: 1%;
                "
              >
                <option
                  v-for="country in countries"
                  :key="country"
                  :value="country"
                >
                  {{ country }}
                </option>
              </select>

              <input
                type="text"
                class="pa-3 mt-4"
                style="
                  border: 1px solid rgb(184, 184, 184);
                  border-radius: 30px;
                  font-size: 14px;
                  width: 43%;
                  margin-left: 1%;
                "
              />
            </div>
            <v-card-actions class="px-0 my-5">
              <v-btn
                class="w-100 text-white"
                color="#3673e2"
                elevation="0"
                height="45"
                density="compact"
                variant="elevated"
                style="
                  text-transform: none;
                  border-radius: 30px;
                  border-color: rgb(199, 199, 199);
                "
              >
                Calculate Shipping
              </v-btn>
            </v-card-actions>

            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>

            <v-card-text class="d-flex align-center justify-space-between">
              <span>TOTAL</span>
              <span class="font-weight-bold" style="font-size: 15px">
                ${{ calcTotalPrice }}
              </span>
            </v-card-text>

            <v-divider length="100%" color="black"></v-divider>
            <v-divider length="100%" color="black"></v-divider>

            <v-card-actions class="px-0 my-5 flex-column" style="gap: 15px">
              <v-btn
                class="w-100 mx-0 text-white"
                color="#3673e2"
                elevation="0"
                height="45"
                density="compact"
                variant="elevated"
                style="
                  text-transform: none;
                  border-radius: 0px;
                  border-color: rgb(199, 199, 199);
                "
                @click="toCheckout"
              >
                Proceed To Checkout
              </v-btn>

              <v-btn
                class="w-100 mx-0"
                elevation="0"
                height="45"
                density="compact"
                variant="outlined"
                @click="$router.push({ name: 'home' })"
                style="
                  text-transform: none;
                  border-radius: 0px;
                  border-color: rgb(199, 199, 199);
                "
              >
                Continue Shopping
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
// Media Queries
@media (max-width: 767px) {
  .cart-page {
    table {
      width: 800px !important;
    }
  }
}
</style>
