import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    selectedAddress: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeItem;
    },

    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        console.log("Item not found in cart for increment!");
      }
    },

    decrementQuantity: (state, action) => {
      // console.log("decrementQuantity called with:", action.payload);
      // console.log("Current cart:", state.cart);
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        // console.log("Current quantity:", itemPresent.quantity);
        if (itemPresent.quantity === 1) {
          // Remove item from cart if quantity becomes 0
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          // Decrease quantity
          itemPresent.quantity--;
        }
      } else {
        console.log("Item not found in cart!");
      }
      console.log("Cart after decrement:", state.cart);
    },

    cleanCart: (state) => {
      state.cart = [];
      state.selectedAddress = null;
    },
    
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setSelectedAddress,
  cleanCart,
} = CartSlice.actions;
export default CartSlice.reducer;
