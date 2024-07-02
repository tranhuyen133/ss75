// src/stores/reducers/productReducer.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Product from '../../interface/interface';
import { addToCart, getCart, getProduct, removeFromCart, updateCart } from '../../service/product.service';

// Initial state
interface ProductState {
  products: Product[];
  cart: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  cart: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const product = state.products.find((p) => p.id === action.payload.id);
        if (product && Number(product.total) > 0) {
          state.cart.push({ ...action.payload, total: '1' });
          product.total = (Number(product.total) - 1).toString();
        }
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const productInCart = state.cart.find((p) => p.id === action.payload.id);
        if (productInCart) {
          productInCart.total = action.payload.quantity.toString();
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const index = state.cart.findIndex((p) => p.id === action.payload);
        if (index !== -1) {
          const product = state.cart[index];
          const productInStore = state.products.find((p) => p.id === product.id);
          if (productInStore) {
            productInStore.total = (Number(productInStore.total) + Number(product.total)).toString();
          }
          state.cart.splice(index, 1);
        }
      });
  },
});

export default productSlice.reducer;
