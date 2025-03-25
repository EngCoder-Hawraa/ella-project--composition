import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useProductsStore = defineStore("products", () => {
  const flashDeals = ref([]);
  const newProducts = ref([]);
  const fragrances = ref([]);
  const furniture = ref([]);
  const categoryProducts = ref([]);
  const categories = ref([
    { title: "Beauty", route: "beauty" },
    { title: "Fragrances", route: "fragrances" },
    { title: "Furniture", route: "furniture" },
    { title: "Groceries", route: "groceries" },
  ]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("https://dummyjson.com/products");
      newProducts.value = data.products.filter(
        (el) => el.category === "beauty"
      );
      flashDeals.value = data.products.slice(0, 8);
      fragrances.value = data.products.filter(
        (el) => el.category === "fragrances"
      );
      furniture.value = data.products.filter(
        (el) => el.category === "furniture"
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductsByCategory = async (category) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      categoryProducts.value = data;
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return {
    flashDeals,
    newProducts,
    fragrances,
    furniture,
    categoryProducts,
    categories,
    getProducts,
    getProductsByCategory,
  };
});
