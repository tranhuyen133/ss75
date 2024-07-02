// src/stores/reducers/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Product from '../interface/interface';

// Fetch products
export const getProduct = createAsyncThunk('product/getProduct', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/listProduct');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Fetch cart data
export const getCart = createAsyncThunk('product/getCart', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/cart');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Add product to cart
export const addToCart = createAsyncThunk('product/addToCart', async (product: Product) => {
  const response = await axios.post('http://localhost:8080/cart', product);
  return response.data;
});

// Update cart
export const updateCart = createAsyncThunk('product/updateCart', async ({ id, quantity }: { id: number; quantity: number }) => {
  await axios.put(`http://localhost:8080/cart/${id}`, { quantity });
  return { id, quantity };
});

// Remove product from cart
export const removeFromCart = createAsyncThunk('product/removeFromCart', async (id: number) => {
  await axios.delete(`http://localhost:8080/cart/${id}`);
  return id;
});
