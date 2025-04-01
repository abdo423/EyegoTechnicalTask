import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCarts } from "@/libs/api";
import { set } from "zod";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}

const getProducts = createAsyncThunk<Product[]>(
  "products/getProducts",
  async () => {
    const products = await fetchCarts();
    return products;
  }
);

const initialState = {
  products: [] as Product[],
  filter:"",
  isDropdownOpen: false,  
  sortOption: "Title",
  loading: false,
  error: null as string | null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    setIsDropdownOpen: (state,action) => {
      state.isDropdownOpen = action.payload;
    },
    sortProductsByTitle: (state) => {
      state.products.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      });
    },
    sortProductsByPrice: (state) => {
      state.products.sort((a, b) => a.price - b.price);
    },
    sortProductsByCategory: (state) => {
      state.products.sort((a, b) => {
        if (a.category.toLowerCase() < b.category.toLowerCase()) return -1;
        if (a.category.toLowerCase() > b.category.toLowerCase()) return 1;
        return 0;
      });
    },
    sortProductsByStock: (state) => {
      state.products.sort((a, b) => a.stock - b.stock);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { setProducts, sortProductsByTitle, sortProductsByPrice,sortProductsByCategory,sortProductsByStock ,setIsDropdownOpen,setSortOption,setFilter} =
  productsSlice.actions;
export { getProducts };
export default productsSlice.reducer;
