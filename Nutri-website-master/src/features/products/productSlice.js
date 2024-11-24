import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";

export const getAllProducts = createAsyncThunk(
  "product/get",
  async (data,thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getRelatedProducts = createAsyncThunk(
  "product/getRelatedProducts",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.getRelatedProducts(productId);
      return response;
    } catch (error) {
      console.error("Error fetching related products:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToViewedProductsAsync = createAsyncThunk(
  "product/addToViewedProducts",
  async (data, thunkAPI) => {
    try {
      const response = await productService.addToViewedProducts(data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
  


export const getAProduct = createAsyncThunk(
  "product/getAProduct",
  async (id,thunkAPI) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addToWishlist = createAsyncThunk(
  "product/wishlist",
  async (prodId, thunkAPI) => {
    try {
      return await productService.addToWishlist(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const addRating = createAsyncThunk(
  "product/rating",
  async (data, thunkAPI) => {
    try {
      const response = await productService.rateProduct(data);
      console.log("Rating response from backend:", response);
      return response; // Ensure you return the correct data structure
    } catch (error) {
      console.error("Error in addRating thunk:", error);
      // Extract meaningful error messages
      const message =
        error.response?.data?.message || error.message || "Failed to rate product";
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const productState = {
  product: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  relatedProducts: [],
  ratings: [],
  singleproduct: null, 

};

export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {  
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToWishlist = action.payload;
        state.message = "Product Added To Wishlist !";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

 
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleproduct = action.payload;
        state.message = "Prodct Fetched Successfully !";
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }) .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ratings = action.payload;
        state.message = "Rating Added Successfully";
        if (state.isSuccess) {
          toast.success("Rating Added Successfully")
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
     .addCase(getRelatedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.relatedProducts = action.payload;
        state.message = "Related Products Fetched Successfully!";

      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToViewedProductsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToViewedProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToViewedProducts = action.payload;
        state.message = "Product Added To Recently Viewed!";
      })
      .addCase(addToViewedProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "Failed to add product to Recently Viewed";
      })
     
     
  },
});

export const { addToViewedProducts } = productSlice.actions;

export default productSlice.reducer;

