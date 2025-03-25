import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("useProductsStore", {
  state: () => ({
    flashDeals: [],
    newProducts: [],
    fragrances: [],
    furniture: [],
  }),
  actions: {
    async getProducts() {
      await axios
        .get("https://dummyjson.com/products")
        .then((res) => {
          console.log(res.data.products);
          this.newProducts = res.data.products.filter(
            (el) => el.category === "beauty"
          );
          this.flashDeals = res.data.products.slice(0, 8);
          this.fragrances = res.data.products.filter(
            (el) => el.category === "fragrances"
          );
          this.furniture = res.data.products.filter(
            (el) => el.category === "furniture"
          );
        })
        .catch((err) => console.log(err));
    },
  },
});
