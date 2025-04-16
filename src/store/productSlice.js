import { createSlice } from '@reduxjs/toolkit';

// Categories data
const categories = [
  { id: 1, name: "Vegetables", icon: "🥦" },
  { id: 2, name: "Cooking Oil", icon: "🫒" },
  { id: 3, name: "Meat", icon: "🥩" },
  { id: 4, name: "Fruits", icon: "🍎" },
  { id: 5, name: "Cereals", icon: "🌾" },
  { id: 6, name: "Rice", icon: "🍚" }
];

// All products data with category IDs  ₦
const allProducts = [ 
];

// Get filtered products based on category ID
const getFilteredProducts = (categoryId) => {
  return allProducts.filter(product => product.categoryId === categoryId);
};

// Initialize default selected units
const initializeSelectedUnits = (categoryId) => {
  const filtered = getFilteredProducts(categoryId);
  const initialUnits = {};

  filtered.forEach(product => {
    if (product.units.length > 0) {
      initialUnits[product.id] = product.units[0];
    }
  });

  return initialUnits;
};

const initialState = {
  categories,
  allProducts,
  selectedCategory: 6, // Default to Rice
  filteredProducts: getFilteredProducts(6), // Initially filter for Rice
  productQuantities: {},
  selectedUnits: initializeSelectedUnits(6),
  cartItems: [], // Cart items
  totalPrice: 0, // Total price of the cart
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredProducts = getFilteredProducts(action.payload);

      // Initialize selected units for new products if not already set
      const filtered = getFilteredProducts(action.payload);
      filtered.forEach(product => {
        if (!state.selectedUnits[product.id] && product.units.length > 0) {
          state.selectedUnits[product.id] = product.units[0];
        }
      });
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      state.productQuantities[productId] = (state.productQuantities[productId] || 0) + 1;
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      state.productQuantities[productId] = Math.max(0, (state.productQuantities[productId] || 0) - 1);
    },
    setSelectedUnit: (state, action) => {
      const { productId, unit } = action.payload;
      state.selectedUnits[productId] = unit;
    },
    // Cart-related reducers
    addToCart: (state, action) => {
      const { product, quantity, selectedUnit } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id && item.selectedUnit === selectedUnit
      );

      if (existingItem) {
        // If the product already exists in the cart, update its quantity
        existingItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add it
        state.cartItems.push({ ...product, quantity, selectedUnit });
      }

      // Update the total price
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },
    removeFromCart: (state, action) => {
      const { productId, selectedUnit } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === productId && item.selectedUnit === selectedUnit)
      );

      // Update the total price
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, selectedUnit, quantity } = action.payload;
      const item = state.cartItems.find(
        (item) => item.id === productId && item.selectedUnit === selectedUnit
      );

      if (item) {
        item.quantity = quantity;
      }

      // Update the total price
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

// Helper function to calculate the total price of the cart
const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => { 
    return total + item.price * item.quantity;
  }, 0);
};

export const {
  setSelectedCategory,
  incrementQuantity,
  decrementQuantity,
  setSelectedUnit,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} = productSlice.actions;

export default productSlice.reducer;