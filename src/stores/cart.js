// stores/cart.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cartStore", () => {
  const cartItems = ref([]);

  function addItem(item) {
    let exists = false;
    for (let i = 0; i < cartItems.value.length; i++) {
      if (cartItems.value[i].id === item.id) {
        cartItems.value[i].quantity += item.quantity;
        exists = true;
        break;
      }
    }
    if (!exists) {
      cartItems.value.push(JSON.parse(JSON.stringify(item)));
    }
    localStorage.setItem("cart-items", JSON.stringify(cartItems.value));
    console.log(cartItems.value);
  }

  function getCartItems() {
    const savedItems = localStorage.getItem("cart-items");
    if (savedItems) {
      cartItems.value = JSON.parse(savedItems);
    }
    console.log(cartItems.value);
  }

  function deleteItem(id) {
    const index = cartItems.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
    }
    localStorage.setItem("cart-items", JSON.stringify(cartItems.value));
  }

  const setToLocalStorage = () => {
    localStorage.setItem("cart-items", JSON.stringify(cartItems.value));
  };

  const resetItems = () => {
    cartItems.value = [];
    localStorage.removeItem("cart-items");
  };

  return {
    cartItems,
    addItem,
    getCartItems,
    deleteItem,
    setToLocalStorage,
    resetItems,
  };
});
