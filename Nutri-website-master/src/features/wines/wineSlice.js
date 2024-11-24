import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { wineService } from "./wineService"; // Update with your wine service file

export const getAllWines = createAsyncThunk(
  "wine/getAllWines",
  async (data, thunkAPI) => {
    try {
      return await wineService.getWines(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAWine = createAsyncThunk(
  "wine/getAWine",
  async (id, thunkAPI) => {
    try {
      return await wineService.getSingleWine(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wine/addToWishlist",
  async (wineId, thunkAPI) => {
    try {
      return await wineService.addToWishlist(wineId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRating = createAsyncThunk(
  "wine/addRating",
  async (data, thunkAPI) => {
    try {
      return await wineService.rateWine(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const wineState = {
  wines: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  recentlyViewed: [],
};

export const wineSlice = createSlice({
  name: "wine",
  initialState: wineState,
  reducers: {
    addToViewedWines: (state, action) => {
      const wineId = action.payload;
      if (!state.recentlyViewed.includes(wineId)) {
        state.recentlyViewed.unshift(wineId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWines.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wines = action.payload;
      })
      .addCase(getAllWines.rejected, (state, action) => {
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
        state.message = "Wine Added To Wishlist!";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAWine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAWine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleWine = action.payload;
        state.message = "Wine Fetched Successfully!";
      })
      .addCase(getAWine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.rating = action.payload;
        state.message = "Rating Added Successfully";
        if (state.isSuccess) {
          toast.success("Rating Added Successfully");
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export const { addToViewedWines } = wineSlice.actions;

export default wineSlice.reducer;
