// wineSlice.js

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import wineService from "./wineService";

export const getWines = createAsyncThunk(
  "wine/get-wines",
  async (thunkAPI) => {
    try {
      return await wineService.getWines();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createWine = createAsyncThunk(
  "wine/create-wine",
  async (wineData, thunkAPI) => {
    try {
      return await wineService.createWine(wineData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAWine = createAsyncThunk(
  "wine/get-wine",
  async (id, thunkAPI) => {
    try {
      return await wineService.getWine(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAWine = createAsyncThunk(
  "wine/update-wine",
  async (wine, thunkAPI) => {
    try {
      return await wineService.updateWine(wine);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAWine = createAsyncThunk(
  "wine/delete-wine",
  async (id, thunkAPI) => {
    try {
      return await wineService.deleteWine(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  wines: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const wineSlice = createSlice({
  name: "wines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWines.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wines = action.payload;
      })
      .addCase(getWines.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createWine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdWine = action.payload;
      })
      .addCase(createWine.rejected, (state, action) => {
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
        state.wineData = action.payload;
      })
      .addCase(getAWine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      
      .addCase(updateAWine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAWine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedWine = action.payload;
      })
      .addCase(updateAWine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      
      .addCase(deleteAWine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAWine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteWine = action.payload;
      })
      .addCase(deleteAWine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      
      .addCase(resetState, () => initialState);
  },
});

export default wineSlice.reducer;
